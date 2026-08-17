import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, GraduationCap, User } from "lucide-react";
import { AuroraBackground, Counter, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand, StatCard } from "@/components/site/Cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses, courseStats, courseTracks } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Learning Tracks & Bootcamps | STIC" },
      {
        name: "description",
        content:
          "Peer-led STIC learning tracks in web development, AI/ML, cloud, cybersecurity and core computer science.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Courses — Learning Tracks & Bootcamps" },
      {
        property: "og:description",
        content: "18 mentor-led tracks, 940+ learners and an 87% completion rate.",
      },
    ],
  }),
  component: Courses,
});

function Courses() {
  const [track, setTrack] = useState("All");
  const filtered = useMemo(
    () => (track === "All" ? courses : courses.filter((c) => c.track === track)),
    [track],
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={18} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="Courses"
            title="Learn it, build it, teach it forward"
            subtitle="Structured, mentor-led tracks run every semester — free for members, project-based from week one."
          />

          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {courseStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <StatCard label={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                </StatCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {["All", ...courseTracks].map((t) => (
            <button
              key={t}
              onClick={() => setTrack(t)}
              className={cn(
                "rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                track === t && "bg-card text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <article className="glass gradient-border glow-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{c.track}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GraduationCap className="size-3.5" /> {c.level}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.topics.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {c.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="size-3.5" /> {c.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="size-3.5 shrink-0" /> {c.mentor}
                  </div>
                </dl>

                <Button asChild variant="hero" size="sm" className="mt-5 w-full">
                  <Link to="/contact">Enroll interest</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
