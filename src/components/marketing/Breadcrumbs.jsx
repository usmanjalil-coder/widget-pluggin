import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map(({ name, path }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
            item: absoluteUrl(path),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map(({ name, path }, index) => (
            <li key={path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page">{name}</span>
              ) : (
                <Link href={path} className="underline-offset-4 hover:underline">
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
