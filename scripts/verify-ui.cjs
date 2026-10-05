const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const base = process.env.UI_BASE_URL || 'http://localhost:3100';
const iteration = process.argv[2] || 'final';
const output = path.join('docs/screenshots', iteration);
fs.mkdirSync(output, { recursive: true });
const issues = [], checks = [];
function contrast(a,b) {
  const l = c => { const v=c.match(/[\d.]+/g).slice(0,3).map(n=>+n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722; };
  const x=l(a), y=l(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
async function main() {
  const browser = await chromium.launch();
  try {
    for (const width of [1440,390]) {
      const context = await browser.newContext({ viewport: {width,height:900}, deviceScaleFactor:1 });
      const page = await context.newPage();
      page.on('pageerror', error => issues.push({width,type:'pageerror',message:error.message}));
      page.on('console', msg => {if(['warning','error'].includes(msg.type()))issues.push({width,type:msg.type(),message:msg.text()});});
      const capture = async (name, fullPage=false) => {
        await page.waitForTimeout(250);
        await page.screenshot({path:path.join(output,`${name}-${width}.png`),fullPage});
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
        assert.equal(overflow,false,`${name}: horizontal overflow at ${width}`);
      };
      await page.goto(`${base}/design-system`);
      await page.evaluate(()=>document.fonts.ready);
      await capture('design-system',true);
      await page.getByRole('button',{name:'Open dialog',exact:true}).click();
      await page.getByRole('dialog').waitFor();
      await capture('design-system-dialog');
      await page.getByRole('button',{name:'Cancel',exact:true}).last().click();
      await page.getByRole('button',{name:'Open sheet',exact:true}).click();
      await capture('design-system-sheet');
      await page.keyboard.press('Escape');
      await page.getByRole('button',{name:'Success toast',exact:true}).click();
      await page.getByText('Your changes are saved').waitFor();
      checks.push(`Gallery overlays, notification and overflow: ${width}px`);

      await page.goto(`${base}/test.html`);
      await page.locator('.cb-launcher').waitFor();
      await page.evaluate(()=>document.fonts.ready);
      await capture('demo-closed',true);
      await page.waitForTimeout(3100);
      assert(await page.locator('.cb-teaser').evaluate(e=>e.classList.contains('cb-visible')));
      await capture('demo-teaser');
      await page.locator('.cb-teaser-close').click();
      await page.locator('.cb-launcher').click();
      await page.waitForTimeout(230);
      assert.equal(await page.locator('.cb-typing-row').isVisible(),false);
      assert.equal(await page.locator('.cb-scroll-bottom').isVisible(),false);
      if(width<480) {
        const rect=await page.locator('.cb-window').boundingBox();
        assert.equal(rect.y,0,'Mobile sheet starts at viewport top');
        assert.equal(rect.height,900,'Mobile sheet fills viewport');
      }
      await capture('demo-greeting');
      await page.locator('.cb-input').fill('What are your opening hours?');
      await page.locator('.cb-send').click();
      await page.waitForFunction(()=>document.querySelector('.cb-host').shadowRoot.querySelector('.cb-bot-row:last-of-type .cb-message').textContent.includes('Thanks'));
      await capture('demo-streaming');
      await page.waitForFunction(()=>!document.querySelector('.cb-host').shadowRoot.querySelector('.cb-input').disabled);
      assert(await page.locator('.cb-chips').evaluate(e=>e.hidden));
      assert.equal(await page.locator('.cb-chips').isVisible(),false);
      await page.locator('.cb-input').fill('I would like an appointment');
      await page.locator('.cb-send').click();
      await page.locator('.cb-form').waitFor();
      await page.waitForTimeout(150);
      await capture('demo-lead-form');
      await page.locator('.cb-form button').click();
      assert(await page.locator('.cb-form-error').isVisible());
      await page.locator('.cb-form input[name=name]').fill('Visual QA Demo');
      await page.locator('.cb-form input[name=phone]').fill('555-0100');
      await page.locator('.cb-form input[name=preferred_time]').fill('Monday morning');
      await page.locator('.cb-form button').click();
      await page.locator('.cb-form-success').waitFor();
      await capture('demo-lead-success');
      checks.push(`Real mock SSE, first-message chips, lead validation and submission: ${width}px`);

      for (const mode of ['light','dark']) {
        for (const color of ['#4F46E5','#16a34a','#f5c518']) {
          await page.evaluate(async ({mode,color})=> {
            const config=await fetch('/api/widget/config/demo').then(r=>r.json());
            const instance = await window.ChatbotWidget.init({botId:'demo'});
            instance.update({...config,theme:{...config.theme,mode,primaryColor:color}});
          },{mode,color});
          await page.locator('.cb-launcher').click();
          await page.waitForTimeout(230);
          await capture(`widget-${mode}-${color.slice(1)}-greeting`);
          await page.locator('.cb-input').fill('Color contrast check');
          await page.locator('.cb-send').click();
          await page.waitForFunction(()=>!document.querySelector('.cb-host').shadowRoot.querySelector('.cb-input').disabled);
          const colors = await page.locator('.cb-user').evaluate(el=>({fg:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
          const ratio = contrast(colors.fg,colors.bg);
          assert(ratio>=4.5,`Contrast ${color}/${mode}: ${ratio}`);
          await capture(`widget-${mode}-${color.slice(1)}`);
          checks.push(`Theme ${mode}/${color} at ${width}: ${ratio.toFixed(2)}:1`);
        }
      }
      await page.goto(`${base}/test-brand.html`);
      await page.locator('.cb-launcher').waitFor();
      await page.evaluate(()=>document.fonts.ready);
      await capture('brand-closed',true);
      await page.locator('.cb-launcher').click();
      await page.waitForTimeout(230);
      assert.match(await page.locator('.cb-message').first().textContent(),/warm welcome/);
      assert.equal(await page.locator('.cb-host').evaluate(e=>e.style.getPropertyValue('--cb-primary')),'#b84e1c');
      const brandColors=await page.locator('.cb-header').evaluate(e=>({fg:getComputedStyle(e).color,bg:e.getRootNode().host.style.getPropertyValue('--cb-primary')}));
      assert(contrast(brandColors.fg,'rgb(184,78,28)')>=4.5);
      await capture('brand-open');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.cb-launcher').getAttribute('aria-expanded'),'false');
      checks.push(`Script color/greeting precedence and Escape: ${width}px`);
      await context.close();
    }

    const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    await page.goto(`${base}/test.html`);
    await page.locator('.cb-launcher').waitFor();
    await page.evaluate(async()=>{const config=await fetch('/api/widget/config/demo').then(r=>r.json());const instance=await window.ChatbotWidget.init({botId:'demo'});instance.update({...config,theme:{...config.theme,primaryColor:'red;position:fixed'},texts:{...config.texts,botName:'<img src=x onerror=alert(1)>',greetingMessage:'<script>alert(1)</script>',avatarUrl:'http://unsafe.example/avatar'},branding:{showBadge:false}});});
    assert.equal(await page.locator('.cb-host').evaluate(e=>e.style.getPropertyValue('--cb-primary')),'#4F46E5');
    assert.equal(await page.locator('.cb-footer').count(),0);
    assert.equal(await page.locator('.cb-avatar').evaluate(e=>e.tagName),'DIV');
    assert.equal(await page.locator('.cb-title').textContent(),'<img src=x onerror=alert(1)>');
    assert.equal(await page.locator('.cb-launcher').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
    await page.evaluate(async()=>{window.qa=await window.ChatbotWidget.init({botId:'demo'});window.qa.update({theme:{position:'left'}});});
    assert.equal(await page.locator('.cb-host').count(),1);
    assert.equal(await page.locator('.cb-left').count(),1);
    await page.evaluate(()=>window.qa.destroy());
    assert.equal(await page.locator('.cb-host').count(),0);
    checks.push('Unsafe config sanitization, text-only rendering, HTTPS avatar restriction, badge flag, reduced motion, init/update/destroy');
    assert.deepEqual(issues,[], 'Browser warnings/errors');
    fs.writeFileSync(path.join(output,'verification.json'),JSON.stringify({checks,issues,screenshots:fs.readdirSync(output).filter(n=>n.endsWith('.png')).length},null,2));
    console.log(JSON.stringify({iteration,screenshots:fs.readdirSync(output).filter(n=>n.endsWith('.png')).length,checks:checks.length,issues},null,2));
  } finally { await browser.close(); }
}
main().catch(e=>{fs.writeFileSync(path.join(output,'failure.json'),JSON.stringify({message:e.message,issues},null,2));console.error(e);process.exitCode=1;});
