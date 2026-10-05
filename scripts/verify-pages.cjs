const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const base = process.env.UI_BASE_URL || 'http://localhost:3100';
const output = path.join('docs/screenshots',process.argv[2] || 'final');
async function main() {
  fs.mkdirSync(output,{recursive:true});
  const browser=await chromium.launch();
  const errors=[],checks=[];
  try {
    for(const width of [1440,390]) {
      const context=await browser.newContext({viewport:{width,height:900}});
      await context.addCookies([{name:'mock_session',value:'visual-qa',url:base}]);
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));
      page.on('console',m=>{if(['warning','error'].includes(m.type()))errors.push(m.text());});
      for(const route of ['/', '/login', '/signup', '/pricing', '/contact', '/privacy', '/terms', '/onboarding', '/dashboard', '/dashboard/bots', '/dashboard/bots/demo?tab=appearance', '/dashboard/bots/demo?tab=knowledge', '/dashboard/bots/demo?tab=settings', '/dashboard/bots/demo?tab=install', '/dashboard/conversations', '/dashboard/leads', '/dashboard/billing', '/dashboard/account']) {
        const response=await page.goto(base+route);
        assert.equal(response.status(),200,route);
        await page.waitForTimeout(500);
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
        checks.push({route,width,overflow});
        if(route.includes('tab=appearance')) {
          await page.locator('.cb-launcher').waitFor();
          await page.locator('.cb-launcher').click();
          await page.waitForTimeout(250);
          const geometry=await page.locator('.cb-window').evaluate(el=>{
            const frame=el.getRootNode().host.parentElement.getBoundingClientRect(),win=el.getBoundingClientRect();
            return {inside:win.left>=frame.left&&win.right<=frame.right+1&&win.top>=frame.top&&win.bottom<=frame.bottom+1};
          });
          assert(geometry.inside,'Appearance chat stays inside preview frame');
        }
        if(['/', '/login','/dashboard','/dashboard/bots/demo?tab=appearance','/onboarding'].includes(route)) {
          const name=route==='/'?'marketing':route.includes('appearance')?'appearance':route.replaceAll('/','').replaceAll('?','-');
          await page.evaluate(()=>window.scrollTo(0,0));
          await page.waitForTimeout(150);
          await page.screenshot({path:path.join(output,`${name}-${width}.png`),fullPage:true});
        }
        if(route==='/onboarding') {
          await page.getByPlaceholder('Example: BrightSmile Dental').fill('Visual QA Clinic');
          await page.getByRole('button',{name:'Next',exact:true}).click();
          await page.getByRole('button',{name:/Upload files/}).waitFor();
          await page.screenshot({path:path.join(output,`onboarding-sources-${width}.png`),fullPage:true});
          await page.getByRole('button',{name:'Next',exact:true}).click();
          await page.locator('.cb-launcher').waitFor();
          await page.locator('.cb-launcher').click();
          await page.waitForTimeout(250);
          await page.screenshot({path:path.join(output,`onboarding-preview-${width}.png`),fullPage:true});
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        }
      }
      await context.close();
    }
    fs.writeFileSync(path.join(output,'pages-verification.json'),JSON.stringify({checks,errors},null,2));
    assert.deepEqual(errors,[], 'Page console warnings/errors');
    assert.deepEqual(checks.filter(c=>c.overflow),[], 'Horizontal overflow');
    console.log(`36 page checks passed; 14 additional screenshots; no browser warnings/errors.`);
  } finally { await browser.close(); }
}
main().catch(e=>{console.error(e);process.exitCode=1;});
