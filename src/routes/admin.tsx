import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Plus,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { achievements, adminStats, events, team, testimonials } from "@/lib/mock";
import logo from "@/lib/logo";
import { cn } from "@/lib/utils";

const nav = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "events", label: "Events", Icon: CalendarDays },
  { key: "members", label: "Members", Icon: Users },
  { key: "achievements", label: "Achievements", Icon: Trophy },
  { key: "testimonials", label: "Testimonials", Icon: MessageSquareQuote },
] as const;

type Section = (typeof nav)[number]["key"];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — STIC Console" },
      {
        name: "description",
        content:
          "Preview of the STIC admin console: manage events, members, achievements and testimonials.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Admin Dashboard — STIC Console" },
      { property: "og:description", content: "Club content management dashboard UI preview." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [section, setSection] = useState<Section>("overview");
  const notImplemented = () =>
    toast.info("UI preview only", { description: "No backend is connected yet." });

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row">
        {/* sidebar */}
        <aside className="glass h-fit rounded-2xl p-4 lg:w-60 lg:shrink-0">
          <div className="flex items-center gap-2.5 px-2 pb-4">
            <img src={logo} alt="" width={32} height={32} className="size-8 rounded-full" />
            <span className="font-display text-sm font-semibold">Admin Console</span>
          </div>
          <nav className="grid gap-1">
            {nav.map((n) => (
              <button
                key={n.key}
                onClick={() => setSection(n.key)}
                aria-current={section === n.key}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  section === n.key
                    ? "bg-[image:var(--gradient-brand)] text-primary-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                <n.Icon className="size-4 shrink-0" /> {n.label}
              </button>
            ))}
          </nav>
          <Button asChild variant="glass" className="mt-4 w-full">
            <Link to="/login">
              <LogOut className="size-4" /> Sign out
            </Link>
          </Button>
        </aside>

        {/* content */}
        <main className="min-w-0 flex-1">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold">
                {nav.find((n) => n.key === section)?.label}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Mock data — connect a backend to make these actions live.
              </p>
            </div>
            <Button variant="hero" onClick={notImplemented}>
              <Plus className="size-4" /> New
            </Button>
          </header>

          {section === "overview" && (
            <div className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {adminStats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold gradient-text">
                      {s.value.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-6">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                  <BarChart3 className="size-4 text-[var(--color-cyan)]" /> Registrations by event
                </h2>
                <ul className="mt-6 grid gap-4">
                  {events.slice(0, 5).map((e, i) => (
                    <li key={e.id} className="grid gap-1.5">
                      <span className="flex items-center justify-between gap-3 text-sm">
                        <span className="truncate text-muted-foreground">{e.title}</span>
                        <span className="font-mono text-xs">{[92, 78, 64, 48, 31][i]}%</span>
                      </span>
                      <span className="h-2 overflow-hidden rounded-full bg-[var(--color-surface)]">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${[92, 78, 64, 48, 31][i]}%`,
                            background: "var(--gradient-brand)",
                          }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {section === "events" && (
            <DataTable
              columns={["Event", "Category", "Date", "Status"]}
              rows={events.map((e) => [e.title, e.category, e.date, e.status])}
              onDelete={notImplemented}
            />
          )}
          {section === "members" && (
            <DataTable
              columns={["Name", "Designation", "Department", "Role"]}
              rows={team.map((m) => [m.name, m.designation, m.department, m.role])}
              onDelete={notImplemented}
            />
          )}
          {section === "achievements" && (
            <DataTable
              columns={["Achievement", "Category", "Date", "Type"]}
              rows={achievements.map((a) => [a.title, a.category, a.date, "Award"])}
              onDelete={notImplemented}
            />
          )}
          {section === "testimonials" && (
            <DataTable
              columns={["Name", "Designation", "Group", "Rating"]}
              rows={testimonials.map((t) => [t.name, t.designation, t.group, `${t.rating} / 5`])}
              onDelete={notImplemented}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function DataTable({
  columns,
  rows,
  onDelete,
}: {
  columns: string[];
  rows: string[][];
  onDelete: () => void;
}) {
  return (
    <div className="glass mt-8 overflow-x-auto rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c}>{c}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              {r.map((cell, j) => (
                <TableCell key={j} className={j === 0 ? "font-medium" : "text-muted-foreground"}>
                  {j === r.length - 1 ? <Badge variant="brand">{cell}</Badge> : cell}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="glass" onClick={onDelete}>
                    Edit
                  </Button>
                  <Button size="sm" variant="glass" onClick={onDelete} aria-label="Delete">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
