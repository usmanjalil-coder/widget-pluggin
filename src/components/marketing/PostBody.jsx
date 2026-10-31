import Link from "next/link";

export function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Ek post ke har h2/h3 ke liye unique id (same text pe -2, -3 lagta hai).
// PostBody aur table of contents dono isi se ids lein.
export function buildHeadingIds(blocks) {
  const seen = {};
  return blocks.map((block) => {
    if (block.type !== "h2" && block.type !== "h3") return null;
    const base = headingId(block.text) || "section";
    seen[base] = (seen[base] || 0) + 1;
    return seen[base] === 1 ? base : `${base}-${seen[base]}`;
  });
}

const linkClass =
  "font-medium text-primary underline underline-offset-4 hover:decoration-2";

function Inline({ content }) {
  return (Array.isArray(content) ? content : [content]).map((part, index) => {
    if (typeof part === "string") return part;
    if (/^https?:\/\//.test(part.href)) {
      return (
        <a
          key={`${part.href}-${index}`}
          href={part.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {part.text}
        </a>
      );
    }
    return (
      <Link key={`${part.href}-${index}`} href={part.href} className={linkClass}>
        {part.text}
      </Link>
    );
  });
}

export function PostBody({ blocks }) {
  const ids = buildHeadingIds(blocks);

  return (
    <div className="space-y-5 text-base leading-8 text-muted-foreground">
      {blocks.map((block, index) => {
        if (block.type === "h2")
          return (
            <h2
              key={index}
              id={ids[index]}
              className="scroll-mt-24 pt-8 text-3xl font-semibold text-foreground"
            >
              {block.text}
            </h2>
          );
        if (block.type === "h3")
          return (
            <h3
              key={index}
              id={ids[index]}
              className="scroll-mt-24 pt-4 text-xl font-semibold text-foreground"
            >
              {block.text}
            </h3>
          );
        if (block.type === "p")
          return (
            <p key={index}>
              <Inline content={block.content} />
            </p>
          );
        if (block.type === "callout")
          return (
            <aside
              key={index}
              className="rounded-xl border border-border bg-muted/30 p-5 text-foreground"
            >
              <Inline content={block.content ?? block.text} />
            </aside>
          );
        if (block.type === "ul" || block.type === "ol") {
          const Tag = block.type;
          return (
            <Tag
              key={index}
              className={`${block.type === "ol" ? "list-decimal" : "list-disc"} space-y-2 pl-6`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline content={item} />
                </li>
              ))}
            </Tag>
          );
        }
        return null;
      })}
    </div>
  );
}