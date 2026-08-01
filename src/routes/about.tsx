import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Flag } from "lucide-react";
import { AuroraBackground, Counter, Reveal, SectionHeading } from "@/components/site/Primitives";
import { stats, timeline } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About STIC — Mission, Vision & Journey" },
      {
        name: "description",
        content:
          "How STIC grew from 24 founding students in 2022 to a nationally recognised technical community of 1000+ members.",
      },
      { property: "og:title", content: "About STIC — Mission, Vision & Journey" },
      {
        property: "og:description",
        content: "Our mission, vision and the milestones from 2022 to national recognition in 2025.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={18} />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="About the club"
            title="We turn curiosity into shipped software"
            subtitle="STIC is a student-run technical community inside the Department of Computer Science, open to every branch and every year."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {[
              {
                Icon: Target,
                title: "Our Mission",
                body: "Give every student a low-friction path from curiosity to competence: weekly hands-on sessions, mentorship from seniors and industry, and real projects that outlive the semester.",
              },
              {
                Icon: Eye,
                title: "Our Vision",
                body: "To be the most respected student technical community in the country — where employers look first for engineers who can design, build, secure and ship.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="glass gradient-border h-full rounded-2xl p-8">
                  <span
                    className="grid size-12 place-items-center rounded-xl text-primary-foreground"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <c.Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-pretty text-muted-foreground">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[var(--color-surface)] py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold gradient-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our journey"
          title="Four years, one direction: forward"
          subtitle="From a single lab and a whiteboard to a national award and fifteen technical teams."
        />
        <ol className="relative mt-14 border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <li className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[41px] grid size-6 place-items-center rounded-full text-[10px] font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Flag className="size-3" />
                </span>
                <p className="font-mono text-sm text-[var(--color-cyan)]">{t.year}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
