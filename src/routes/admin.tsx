import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Images,
  FileText,
  FolderGit2,
  UserPlus,
  BookOpen,
  TrendingUp,
  Eye,
  MousePointerClick,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/site/Primitives";
import { blogs, events, gallery, projects, resources, team } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/stic-logo.jpg.asset.json";
const logo = logoAsset.url;

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — STIC Console" },
      {
        name: "description",
        content:
          "Internal STIC admin console UI for managing events, team, gallery, blogs, projects, members and resources.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — STIC Console" },
      { property: "og:description", content: "Manage club content from one console." },
    ],
  }),
  component: Admin,
});

const sections = [
  { key: "Dashboard", Icon: LayoutDashboard },
  { key: "Events", Icon: CalendarDays },
  { key: "Team", Icon: Users },
  { key: "Gallery", Icon: Images },
  { key: "Blogs", Icon: FileText },
  { key: "Projects", Icon: FolderGit2 },
  { key: "Members", Icon: UserPlus },
  { key: "Resources", Icon: BookOpen },
] as const;

type SectionKey = (typeof sections)[number]["key"];

const analytics = [
  { label: "Page views (30d)", value: 48210, suffix: "", Icon: Eye },
  { label: "Event registrations", value: 1342, suffix: "", Icon: MousePointerClick },
  { label: "New members", value: 186, suffix: "", Icon: UserPlus },
  { label: "Engagement rate", value: 62, suffix: "%", Icon: TrendingUp },
];

const activities = [
  { who: "Meera Nair", what: "published event “HackSTIC 3.0”", when: "12m ago" },
  { who: "Kabir Sethi", what: "uploaded 14 photos to Gallery", when: "1h ago" },
  { who: "Ananya Verma", what: "edited blog “Fine-tuning small LMs”", when: "3h ago" },
  { who: "Rohan Iyer", what: "approved 8 membership requests", when: "Yesterday" },
  { who: "Ishita Rao", what: "added resource “DSA Roadmap 2026”", when: "2d ago" },
];

function rowsFor(section: SectionKey) {
  switch (section) {
    case "Events":
      return events.map((e) => ({ primary: e.title, secondary: `${e.date} · ${e.venue}`, tag: e.category }));
    case "Team":
      return team.map((m) => ({ primary: m.name, secondary: m.email, tag: m.group }));
    case "Gallery":
      return gallery.map((g) => ({ primary: g.caption, secondary: "JPG · 1280×800", tag: g.category }));
    case "Blogs":
      return blogs.map((b) => ({ primary: b.title, secondary: `${b.author} · ${b.date}`, tag: b.tag }));
    case "Projects":
      return projects.map((p) => ({ primary: p.title, secondary: p.stack.join(", "), tag: "Live" }));
    case "Members":
      return team.map((m) => ({ primary: m.name, secondary: m.email, tag: "Active" }));
    case "Resources":
      return resources.map((r) => ({ primary: r.title, secondary: r.description, tag: r.type }));
    default:
      return [];
  }
}

function Admin() {
  const [active, setActive] = useState<SectionKey>("Dashboard");
  const rows = rowsFor(active);

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border p-4 lg:block">
          <Link to="/" className="flex items-center gap-2.5 px-2 py-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-display font-bold">STIC Console</span>
          </Link>
          <nav className="mt-4 grid gap-1">
            {sections.map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active === key
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" /> {key === "Dashboard" ? key : `Manage ${key}`}
              </button>
            ))}
          </nav>
          <Button asChild variant="ghost" size="sm" className="mt-6 w-full justify-start">
            <Link to="/">
              <ArrowLeft className="size-4" /> Back to site
            </Link>
          </Button>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-8">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold">
                {active === "Dashboard" ? "Dashboard" : `Manage ${active}`}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Signed in as Aarav Mehta · President
              </p>
            </div>
            <Button variant="hero" size="sm" onClick={() => toast.info("UI demo — no backend connected")}>
              <Plus className="size-4" /> New
            </Button>
          </header>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {sections.map(({ key }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs",
                  active === key
                    ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {key}
              </button>
            ))}
          </div>

          {active === "Dashboard" ? (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {analytics.map((a) => (
                  <div key={a.label} className="glass rounded-2xl p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {a.label}
                      </span>
                      <a.Icon className="size-4 text-[var(--color-cyan)]" />
                    </div>
                    <p className="mt-3 font-display text-3xl font-bold">
                      <Counter value={a.value} suffix={a.suffix} />
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="glass rounded-2xl p-6 lg:col-span-2">
                  <h2 className="font-display text-lg font-semibold">Content overview</h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Events", n: events.length },
                      { label: "Team members", n: team.length },
                      { label: "Gallery items", n: gallery.length },
                      { label: "Blog posts", n: blogs.length },
                      { label: "Projects", n: projects.length },
                      { label: "Resources", n: resources.length },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm"
                      >
                        <span className="text-muted-foreground">{c.label}</span>
                        <span className="font-display font-semibold">{c.n}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h2 className="font-display text-lg font-semibold">Recent activity</h2>
                  <ul className="mt-5 grid gap-4">
                    {activities.map((a, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span
                          className="mt-1.5 size-2 shrink-0 rounded-full"
                          style={{ background: "var(--gradient-brand)" }}
                        />
                        <span className="min-w-0">
                          <span className="font-medium">{a.who}</span>{" "}
                          <span className="text-muted-foreground">{a.what}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{a.when}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="glass mt-8 overflow-hidden rounded-2xl">
              <ul className="divide-y divide-border">
                {rows.map((r, i) => (
                  <li
                    key={`${r.primary}-${i}`}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:flex sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{r.primary}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.secondary}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant="outline" className="hidden sm:inline-flex">
                        {r.tag}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${r.primary}`}
                        onClick={() => toast.info("UI demo — editing is not wired up")}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${r.primary}`}
                        onClick={() => toast.error("UI demo — deletion is disabled")}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
