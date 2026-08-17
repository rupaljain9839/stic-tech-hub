import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Eye, Flag, Rocket, Target } from "lucide-react";
import { AuroraBackground, Counter, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand, StatCard } from "@/components/site/Cards";
import { achievementTimeline, heroStats } from "@/lib/mock";

const objectives = [
  "Run at least one hands-on technical event every month, open to all branches.",
  "Pair every beginner with a senior mentor within their first two weeks.",
  "Ship four flagship open-source projects each academic year.",
  "Prepare members for hackathons, research submissions and placement interviews.",
  "Build industry bridges through guest sessions, sponsorships and internships.",
];

const whyJoin = [
  {
    title: "Real projects, not tutorials",
    body: "Join a squad on day one and contribute to something users actually touch by the end of the semester.",
  },
  {
    title: "Mentorship that answers back",
    body: "Weekly reviews from seniors, alumni engineers and faculty — on your code, your design and your pitch.",
  },
  {
    title: "A network that outlives college",
    body: "Alumni across product firms and startups return for demo nights, referrals and mock interviews.",
  },
  {
    title: "Space to lead",
    body: "Run a track, host a workshop or manage a hackathon — leadership roles rotate every year by design.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About STIC — Mission, Vision & Journey" },
      {
        name: "description",
        content:
          "The mission, vision and objectives behind STIC, and the milestones from a 24-student club to a national award-winning community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "About STIC — Mission, Vision & Journey" },
      {
        property: "og:description",
        content: "How a student technical club grew into a nationally recognised innovation community.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="About the club"
            title="We turn curiosity into shipped software"
            subtitle="STIC is a student-run technology community inside the Department of Computer Science — open to every branch and every year."
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

      {/* stats */}
      <section className="border-y border-border bg-[var(--color-surface)] py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <StatCard label={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
              </StatCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* objectives */}
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            align="left"
            eyebrow="Objectives"
            title="What we hold ourselves to each year"
            subtitle="Five commitments the coordinating team reviews every semester."
          />
          <ul className="grid gap-3">
            {objectives.map((o, i) => (
              <Reveal key={o} delay={i * 0.06}>
                <li className="glass flex gap-3 rounded-2xl p-5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-cyan)]" />
                  <span>{o}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* why join */}
      <section className="border-y border-border bg-[var(--color-surface)]">
        <div className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Why join"
            title="What you actually get out of it"
            subtitle="Beyond the certificate — the four things members tell us mattered most."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {whyJoin.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="glass gradient-border glow-hover h-full rounded-2xl p-7">
                  <span className="font-mono text-xs text-[var(--color-cyan)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="section-pad mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our journey"
          title="Four years, one direction: forward"
          subtitle="From a single lab and a whiteboard to a national award, research papers and fifteen technical teams."
        />
        <ol className="relative mt-14 border-l border-border pl-8">
          {achievementTimeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <li className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[41px] grid size-6 place-items-center rounded-full text-primary-foreground"
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
        <div className="mt-6 flex items-center gap-2 pl-8 text-sm text-muted-foreground">
          <Rocket className="size-4 text-[var(--color-cyan)]" /> And the next chapter is being
          written by this year's cohort.
        </div>
      </section>

      <CtaBand />
    </>
  );
}
