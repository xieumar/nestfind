import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground font-sans">
      <div className="w-full max-w-xl space-y-6">
        {/* Card 1: Colors & Typography Test */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h1 className="font-heading text-2xl font-bold text-accent">
            NestFind Font & Color Test
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-sans">
            Testing Space Grotesk (headings) and Inter (body copy) using
            declared global CSS variables.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-primary p-3 text-center text-primary-foreground">
              <span className="block text-xs font-bold">Primary</span>
              <span className="text-[11px] opacity-80">#587A23</span>
            </div>
            <div className="rounded-lg bg-secondary p-3 text-center text-secondary-foreground">
              <span className="block text-xs font-bold">Secondary</span>
              <span className="text-[11px] opacity-80">#92AE67</span>
            </div>
            <div className="rounded-lg bg-accent p-3 text-center text-accent-foreground">
              <span className="block text-xs font-bold">Accent</span>
              <span className="text-[11px] opacity-80">#6E3209</span>
            </div>
            <div className="rounded-lg bg-pearl-lusta border border-border p-3 text-center text-accent">
              <span className="block text-xs font-bold">Pearl Lusta</span>
              <span className="text-[11px] opacity-80">#FCEDD9</span>
            </div>
          </div>
        </div>

        {/* Card 2: shadcn Button Component Preview */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-foreground">
            shadcn Button Component Test
          </h2>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            Testing shadcn Button variants integrated with custom palette.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
