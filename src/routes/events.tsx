import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { EventCard } from "@/components/site/Cards";
import { eventCategories, events } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Hackathons, Workshops & Bootcamps | STIC" },
      {
        name: "description",
        content:
          "Browse STIC events: hackathons, workshops, bootcamps, seminars and coding competitions with dates, venues and registration.",
      },
      { property: "og:title", content: "Events — Hackathons, Workshops & Bootcamps | STIC" },
      {
        property: "og:description",
        content: "Filter upcoming STIC events by category and register in one click.",
      },
    ],
  }),
  component: Events,
});

function Events() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={18} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Events"
          title="Something to build every month"
          subtitle="Everything is free for members unless a materials fee is listed. Bring a laptop and curiosity."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...eventCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No events in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
