import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { imageFor, useGallery } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — STIC Events, Hackathons & Workshops" },
      {
        name: "description",
        content:
          "Photos from STIC hackathons, workshops, seminars and team nights — browse by category and open full previews.",
      },
      { property: "og:title", content: "Gallery — STIC Events, Hackathons & Workshops" },
      {
        property: "og:description",
        content: "A visual archive of what the club has built and celebrated.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);
  const { data: rows = [] } = useGallery();

  const all = useMemo(
    () =>
      rows.map((g, i) => ({
        id: g.id,
        caption: g.caption,
        category: g.category,
        span: g.span,
        src: imageFor(g.image_url, i),
      })),
    [rows],
  );
  const categories = useMemo(
    () => Array.from(new Set(all.map((g) => g.category))).filter(Boolean),
    [all],
  );
  const items = all.filter((g) => filter === "All" || g.category === filter);
  const current = active !== null ? items[active] : null;

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={16} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Late nights, bright screens"
          subtitle="Moments from the events, hackathons and workshops that shaped the club."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setActive(null);
              }}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all",
                filter === c
                  ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((g, i) => (
            <Reveal key={g.id}>
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border"
                aria-label={`Open ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className={cn(
                    "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                    g.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]",
                  )}
                />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface),transparent_55%)] opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 text-left">
                  <span className="text-sm font-medium">{g.caption}</span>
                  <Expand className="size-4 shrink-0 text-[var(--color-cyan)] opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl border-border bg-[var(--color-surface)] p-2">
          {current && (
            <>
              <DialogTitle className="px-3 pt-2 text-sm font-normal text-muted-foreground">
                {current.caption} · {current.category}
              </DialogTitle>
              <img
                src={current.src}
                alt={current.caption}
                width={1280}
                height={800}
                className="w-full rounded-xl object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
