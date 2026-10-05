import Link from "next/link";
import { Check, MessageSquare, Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";

export default function AuthShowcase({ title, description, items }) {
  return <aside className="relative order-2 hidden min-h-[620px] overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-sm lg:flex lg:flex-col lg:justify-between">
    <div className="pointer-events-none absolute -top-24 -right-20 size-80 rounded-full bg-primary-foreground/10 blur-3xl" />
    <div className="relative"><Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold"><span className="grid size-10 place-items-center rounded-xl bg-primary-foreground text-primary"><MessageSquare className="size-5" /></span>{brand.name}</Link><h1 className="mt-14 max-w-md text-4xl font-semibold leading-tight tracking-tight">{title}</h1><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/80">{description}</p></div>
    <div className="relative space-y-5"><div className="ml-auto max-w-[370px] rounded-2xl border border-primary-foreground/20 bg-card p-4 text-foreground shadow-lg"><div className="flex items-center gap-2 border-b border-border pb-3"><span className="grid size-8 place-items-center rounded-lg bg-accent text-primary"><Sparkles className="size-4" /></span><span className="text-sm font-semibold">Assistant preview</span><span className="ml-auto size-2 rounded-full bg-success" /></div><div className="mt-4 space-y-3"><p className="w-fit max-w-[85%] rounded-xl bg-muted px-3 py-2 text-sm">Hi! How can I help?</p><p className="ml-auto w-fit max-w-[85%] rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground">What are your hours?</p><p className="w-fit max-w-[85%] rounded-xl bg-muted px-3 py-2 text-sm">I can help with that.</p></div></div><div className="grid gap-2">{items.map((item) => <p key={item} className="flex items-center gap-2 text-sm text-primary-foreground/90"><Check className="size-4" />{item}</p>)}</div></div>
  </aside>;
}
