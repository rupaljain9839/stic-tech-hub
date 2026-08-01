import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { TeamCard } from "@/components/site/Cards";
import { team, type TeamGroup } from "@/lib/site-data";

const sections: { label: string; groups: TeamGroup[] }[] = [
  { label: "Faculty Mentor", groups: ["Faculty Coordinator"] },
  { label: "Office Bearers", groups: ["President", "Vice President"] },
  {
    label: "Leads",
    groups: ["Technical Lead", "Event Lead", "Design Lead", "Content Lead"],
  },
  { label: "Core Team", groups: ["Core Team"] },
  { label: "Executive Members", groups: ["Executive Members"] },
];


export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — STIC Leadership & Core Members" },
      {
        name: "description",
        content:
          "Meet the faculty coordinator, office bearers, technical leads and core team running STIC this year.",
      },
      { property: "og:title", content: "Team — STIC Leadership & Core Members" },
      {
        property: "og:description",
        content: "The students and faculty behind STIC's workshops, hackathons and projects.",
      },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={18} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="The people"
          title="Built and run by students"
          subtitle="Nine roles, fifteen teams and one shared inbox — here is who you'll be working with."
        />

        <div className="mt-16 space-y-16">
          {sections.map((section) => {
            const members = team.filter((m) => section.groups.includes(m.group));
            if (members.length === 0) return null;
            return (
              <div key={section.label}>
                <div className="flex items-center gap-4">
                  <h3 className="shrink-0 font-display text-lg font-semibold">{section.label}</h3>
                  <span className="h-px flex-1 bg-[image:var(--gradient-brand)] opacity-40" />
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((m, i) => (
                    <Reveal key={m.name} delay={i * 0.06}>
                      <TeamCard member={m} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
