import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { ProjectCard } from "@/components/site/Cards";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Student-Built Software | STIC" },
      {
        name: "description",
        content:
          "Open-source projects built by STIC members: analytics dashboards, ML tooling, security scanners and campus apps.",
      },
      { property: "og:title", content: "Projects — Student-Built Software | STIC" },
      {
        property: "og:description",
        content: "Six flagship student projects with source code and live demos.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={16} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Software students actually use"
          subtitle="Every project starts as a club problem and ends as an open-source repo with real users on campus."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
