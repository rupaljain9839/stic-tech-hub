import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import { AuroraBackground, Counter, Reveal, SectionHeading } from "@/components/site/Primitives";
import { AchievementCard, CtaBand, StatCard } from "@/components/site/Cards";
import {
  achievements,
  achievementCategories,
  achievementCounters,
  achievementTimeline,
} from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Awards, Research & Milestones | STIC" },
      {
        name: "description",
        content:
          "Hackathon wins, competition results, certifications, research papers and club milestones earned by STIC members.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Achievements — Awards, Research & Milestones" },
      {
        property: "og:description",
        content: "42 awards, 160+ certifications and our first patent filing — the record so far.",
      },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  const [category, setCategory] = useState<string>("All");
  const filtered = useMemo(
    () => (category === "All" ? achievements : achievements.filter((a) => a.category === category)),
    [category],
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="Achievements"
            title="Proof that the work travels"
            subtitle="National hackathon wins, regional qualifications, certifications, papers and patents — earned by members, not handed to them."
          />

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {achievementCounters.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <StatCard label={c.label}>
                  <Counter value={c.value} suffix={c.suffix} />
                </StatCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {["All", ...achievementCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  category === c
                    ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={(i % 6) * 0.06}>
                <AchievementCard achievement={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[var(--color-surface)]">
        <div className="section-pad mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Milestone timeline"
            title="How the record was built"
            subtitle="Every year added a capability the club did not have before."
          />
          <ol className="relative mt-14 border-l border-border pl-8">
            {achievementTimeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <li className="relative pb-12 last:pb-0">
                  <span
                    className="absolute -left-[41px] grid size-6 place-items-center rounded-full text-primary-foreground"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Trophy className="size-3" />
                  </span>
                  <p className="font-mono text-sm text-[var(--color-cyan)]">{t.year}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-muted-foreground">{t.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
