import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { Badge } from "@/components/ui/badge";
import { useResources } from "@/lib/content";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Roadmaps, Guides & Notebooks | STIC" },
      {
        name: "description",
        content:
          "Curated learning resources from STIC: DSA roadmaps, ML notebooks, cloud handbooks, interview prep and design primers.",
      },
      { property: "og:title", content: "Resources — Roadmaps, Guides & Notebooks | STIC" },
      {
        property: "og:description",
        content: "Free, member-maintained study material for every technical track.",
      },
    ],
  }),
  component: Resources,
});

function Resources() {
  const { data: resources = [] } = useResources();

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={14} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Resources"
          title="Everything we wish we had in first year"
          subtitle="Maintained by the technical teams, refreshed each semester, free for everyone."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <a
                href={r.link}
                className="glass gradient-border glow-hover group flex h-full flex-col rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <BookOpen className="size-4" />
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {r.type}
                  </Badge>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-cyan)]">
                  Open resource
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        {resources.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            Resources are being updated — check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}
