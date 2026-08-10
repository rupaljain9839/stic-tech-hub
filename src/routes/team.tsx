import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand, TeamMemberCard } from "@/components/site/Cards";
import { Input } from "@/components/ui/input";
import { team, teamRoles } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Leadership & Core Members | STIC Tech Hub" },
      {
        name: "description",
        content:
          "Meet the faculty coordinator, office bearers, technical leads and core members running STIC Tech Hub this year.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Team — Leadership & Core Members | STIC Tech Hub" },
      {
        property: "og:description",
        content: "The students and faculty behind our workshops, hackathons and projects.",
      },
    ],
  }),
  component: Team,
});

function Team() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return team.filter((m) => {
      const matchesRole = role === "All" || m.role === role;
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [query, role]);

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="The people"
            title="Built and run by students"
            subtitle="A faculty coordinator, office bearers and six departments — here is who you'll be working with."
          />

          <div className="mx-auto mt-12 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, role or department"
                aria-label="Search team members"
                className="h-12 rounded-full pl-11"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["All", ...teamRoles].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                aria-pressed={role === r}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  role === r
                    ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Users className="size-3.5" /> {filtered.length} of {team.length} members
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={(i % 8) * 0.05}>
                <TeamMemberCard member={m} />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-muted-foreground">
              No members match that search — try a different name or role.
            </p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
