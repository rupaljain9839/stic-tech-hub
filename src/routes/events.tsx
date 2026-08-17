import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand, EventCard } from "@/components/site/Cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { events, eventCategories, type ClubEvent, type EventStatus } from "@/lib/mock";
import { cn } from "@/lib/utils";

const tabs: { key: EventStatus; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "ongoing", label: "Ongoing" },
  { key: "past", label: "Past" },
];

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Hackathons, Workshops & Bootcamps | STIC" },
      {
        name: "description",
        content:
          "Browse STIC events: hackathons, workshops, bootcamps, seminars and coding competitions with dates, venues and registration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Events — Hackathons, Workshops & Bootcamps | STIC" },
      {
        property: "og:description",
        content: "Filter upcoming, ongoing and past events by category and register in one click.",
      },
    ],
  }),
  component: Events,
});

function Events() {
  const [tab, setTab] = useState<EventStatus>("upcoming");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<ClubEvent | null>(null);

  const filtered = useMemo(
    () =>
      events.filter(
        (e) => e.status === tab && (category === "All" || e.category === category),
      ),
    [tab, category],
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="Events"
            title="Something to build every month"
            subtitle="Hackathons, workshops, bootcamps, seminars and competitions — free for members unless a materials fee is listed."
          />

          <div className="mx-auto mt-12 flex w-fit gap-1 rounded-full border border-border p-1">
            {tabs.map((t) => {
              const count = events.filter((e) => e.status === t.key).length;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm transition-all",
                    tab === t.key
                      ? "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}{" "}
                  <span className="font-mono text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["All", ...eventCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs transition-all",
                  category === c
                    ? "border-[var(--color-cyan)] text-[var(--color-cyan)]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <Reveal key={e.id} delay={(i % 6) * 0.06}>
                <EventCard event={e} onDetails={setActive} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground">
              Nothing in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <img
                src={active.image}
                alt={active.title}
                width={800}
                height={450}
                className="aspect-video w-full rounded-xl object-cover"
              />
              <DialogHeader>
                <Badge variant="brand" className="w-fit">
                  {active.category}
                </Badge>
                <DialogTitle className="text-balance font-display">{active.title}</DialogTitle>
                <DialogDescription>{active.details}</DialogDescription>
              </DialogHeader>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Calendar className="size-4 text-[var(--color-cyan)]" /> {active.date}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4 text-[var(--color-cyan)]" /> {active.venue}
                </li>
                <li className="flex items-center gap-2">
                  <Ticket className="size-4 text-[var(--color-cyan)]" /> {active.seats}
                </li>
              </ul>
              <Button variant="hero" disabled={active.status === "past"}>
                {active.status === "past" ? "Registration closed" : "Register now"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CtaBand />
    </>
  );
}
