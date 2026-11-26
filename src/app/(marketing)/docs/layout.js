import { DocsSidebar } from "@/components/marketing/DocsSidebar";

export default function DocsLayout({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
