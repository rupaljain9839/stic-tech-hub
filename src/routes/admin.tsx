import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  CalendarDays,
  Images,
  FileText,
  FolderGit2,
  BookOpen,
  TrendingUp,
  Eye,
  MousePointerClick,
  UserPlus,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Loader2,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Counter } from "@/components/site/Primitives";
import { supabase } from "@/integrations/supabase/client";
import { authKeys, useIsAdmin, useSession } from "@/lib/auth";
import {
  contentKeys,
  useBlogs,
  useEvents,
  useGallery,
  useProjects,
  useResources,
  type ContentTable,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import logo from "@/lib/logo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — STIC Console" },
      {
        name: "description",
        content:
          "STIC admin console for managing resources, events, blogs, gallery and projects across the club website.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — STIC Console" },
      { property: "og:description", content: "Manage club content from one console." },
    ],
  }),
  component: Admin,
});

type FieldType = "text" | "textarea" | "list";
type Field = { name: string; label: string; type: FieldType; required?: boolean; placeholder?: string };

type SectionConfig = {
  key: string;
  label: string;
  Icon: typeof LayoutDashboard;
  table: ContentTable;
  queryKey: readonly unknown[];
  fields: Field[];
  primary: string;
  secondary: (row: Record<string, unknown>) => string;
  tag: string;
};

const sectionConfigs: SectionConfig[] = [
  {
    key: "resources",
    label: "Resources",
    Icon: BookOpen,
    table: "resources",
    queryKey: contentKeys.resources,
    primary: "title",
    tag: "type",
    secondary: (r) => String(r["description"] ?? ""),
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "type", label: "Type", type: "text", placeholder: "Guide, Roadmap, Playbook…" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "link", label: "Link", type: "text", placeholder: "https://…" },
      { name: "sort_order", label: "Sort order", type: "text", placeholder: "1" },
    ],
  },
  {
    key: "events",
    label: "Events",
    Icon: CalendarDays,
    table: "club_events",
    queryKey: contentKeys.events,
    primary: "title",
    tag: "category",
    secondary: (r) => `${String(r["date_label"] ?? "")} · ${String(r["venue"] ?? "")}`,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "Hackathon, Workshop…" },
      { name: "date_label", label: "Date", type: "text", placeholder: "Sep 12, 2026" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "text", placeholder: "https://… (optional)" },
      { name: "sort_order", label: "Sort order", type: "text", placeholder: "1" },
    ],
  },
  {
    key: "blogs",
    label: "Blogs",
    Icon: FileText,
    table: "blogs",
    queryKey: contentKeys.blogs,
    primary: "title",
    tag: "tag",
    secondary: (r) => `${String(r["author"] ?? "")} · ${String(r["date_label"] ?? "")}`,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "author", label: "Author", type: "text" },
      { name: "date_label", label: "Date", type: "text", placeholder: "Jul 14, 2026" },
      { name: "read_time", label: "Read time", type: "text", placeholder: "8 min" },
      { name: "tag", label: "Tag", type: "text", placeholder: "Community, AI/ML…" },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "sort_order", label: "Sort order", type: "text", placeholder: "1" },
    ],
  },
  {
    key: "gallery",
    label: "Gallery",
    Icon: Images,
    table: "gallery_items",
    queryKey: contentKeys.gallery,
    primary: "caption",
    tag: "category",
    secondary: (r) => `${String(r["span"] ?? "short")} tile`,
    fields: [
      { name: "caption", label: "Caption", type: "text", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "Events, Hackathons…" },
      { name: "image_url", label: "Image URL", type: "text", placeholder: "https://… (optional)" },
      { name: "span", label: "Tile size", type: "text", placeholder: "short or tall" },
      { name: "sort_order", label: "Sort order", type: "text", placeholder: "1" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    Icon: FolderGit2,
    table: "club_projects",
    queryKey: contentKeys.projects,
    primary: "title",
    tag: "sort_order",
    secondary: (r) => (Array.isArray(r["stack"]) ? (r["stack"] as string[]).join(", ") : ""),
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "stack", label: "Tech stack (comma separated)", type: "list", placeholder: "React, Node" },
      { name: "image_url", label: "Image URL", type: "text", placeholder: "https://… (optional)" },
      { name: "github", label: "GitHub URL", type: "text" },
      { name: "demo", label: "Demo URL", type: "text" },
      { name: "sort_order", label: "Sort order", type: "text", placeholder: "1" },
    ],
  },
];

const analytics = [
  { label: "Page views (30d)", value: 48210, suffix: "", Icon: Eye },
  { label: "Event registrations", value: 1342, suffix: "", Icon: MousePointerClick },
  { label: "New members", value: 186, suffix: "", Icon: UserPlus },
  { label: "Engagement rate", value: 62, suffix: "%", Icon: TrendingUp },
];

function toPayload(fields: Field[], values: Record<string, string>) {
  const payload: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = (values[f.name] ?? "").trim();
    if (f.name === "sort_order") {
      payload[f.name] = raw === "" ? 0 : Number.parseInt(raw, 10) || 0;
    } else if (f.type === "list") {
      payload[f.name] = raw === "" ? [] : raw.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (f.name === "image_url" || f.name === "github" || f.name === "demo") {
      payload[f.name] = raw === "" ? null : raw;
    } else {
      payload[f.name] = raw;
    }
  }
  return payload;
}

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: session, isLoading: sessionLoading } = useSession();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin(Boolean(session));

  const [active, setActive] = useState<string>("Dashboard");
  const [editing, setEditing] = useState<{ section: SectionConfig; row: Record<string, unknown> | null } | null>(
    null,
  );

  useEffect(() => {
    if (!sessionLoading && !session) void navigate({ to: "/login", replace: true });
  }, [session, sessionLoading, navigate]);

  const resources = useResources();
  const events = useEvents();
  const blogs = useBlogs();
  const gallery = useGallery();
  const projects = useProjects();

  const dataFor = useMemo<Record<string, Record<string, unknown>[]>>(
    () => ({
      resources: (resources.data ?? []) as unknown as Record<string, unknown>[],
      events: (events.data ?? []) as unknown as Record<string, unknown>[],
      blogs: (blogs.data ?? []) as unknown as Record<string, unknown>[],
      gallery: (gallery.data ?? []) as unknown as Record<string, unknown>[],
      projects: (projects.data ?? []) as unknown as Record<string, unknown>[],
    }),
    [resources.data, events.data, blogs.data, gallery.data, projects.data],
  );

  const removeMutation = useMutation({
    mutationFn: async ({ section, id }: { section: SectionConfig; id: string }) => {
      const { error } = await supabase.from(section.table).delete().eq("id", id);
      if (error) throw error;
      return section;
    },
    onSuccess: (section) => {
      void queryClient.invalidateQueries({ queryKey: section.queryKey });
      toast.success("Deleted");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/login", replace: true });
  }

  if (sessionLoading || (session && adminLoading)) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--color-surface)]">
        <Loader2 className="size-6 animate-spin text-[var(--color-cyan)]" />
      </div>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--color-surface)] px-4">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <ShieldAlert className="mx-auto size-8 text-[var(--color-cyan)]" />
          <h1 className="mt-4 font-display text-xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're signed in as {session.user.email}, but this account isn't an approved admin yet. Ask an
            existing admin to grant you console access.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="size-4" /> Sign out
            </Button>
            <Button asChild variant="hero">
              <Link to="/">Back to site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const current = sectionConfigs.find((s) => s.label === active) ?? null;
  const rows = current ? (dataFor[current.key] ?? []) : [];

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border p-4 lg:block">
          <Link to="/" className="flex items-center gap-2.5 px-2 py-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full" />
            <span className="font-display font-bold">STIC Console</span>
          </Link>
          <nav className="mt-4 grid gap-1">
            <button
              onClick={() => setActive("Dashboard")}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active === "Dashboard"
                  ? "bg-card text-foreground"
                  : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
              )}
            >
              <LayoutDashboard className="size-4 shrink-0" /> Dashboard
            </button>
            {sectionConfigs.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.label)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active === s.label
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                )}
              >
                <s.Icon className="size-4 shrink-0" /> Manage {s.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 grid gap-1">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link to="/">
                <ArrowLeft className="size-4" /> Back to site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-8">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl font-bold">
                {current ? `Manage ${current.label}` : "Dashboard"}
              </h1>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                Signed in as {session.user.email} · Admin
              </p>
            </div>
            {current && (
              <Button variant="hero" size="sm" onClick={() => setEditing({ section: current, row: null })}>
                <Plus className="size-4" /> New
              </Button>
            )}
          </header>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {["Dashboard", ...sectionConfigs.map((s) => s.label)].map((key) => (
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

          {!current ? (
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

              <div className="glass mt-6 rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold">Content overview</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionConfigs.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setActive(s.label)}
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-card"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <s.Icon className="size-4" /> {s.label}
                      </span>
                      <span className="font-display font-semibold">{(dataFor[s.key] ?? []).length}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass mt-8 overflow-hidden rounded-2xl">
              {rows.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Nothing here yet — use “New” to add the first entry.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {rows.map((r) => (
                    <li
                      key={String(r["id"])}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-4 sm:flex sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{String(r[current.primary] ?? "")}</p>
                        <p className="truncate text-xs text-muted-foreground">{current.secondary(r)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant="outline" className="hidden sm:inline-flex">
                          {String(r[current.tag] ?? "")}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit ${String(r[current.primary] ?? "")}`}
                          onClick={() => setEditing({ section: current, row: r })}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${String(r[current.primary] ?? "")}`}
                          onClick={() => {
                            if (window.confirm("Delete this item? This cannot be undone.")) {
                              removeMutation.mutate({ section: current, id: String(r["id"]) });
                            }
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {editing && (
        <EditorDialog
          section={editing.section}
          row={editing.row}
          onClose={() => setEditing(null)}
          onSaved={() => {
            void queryClient.invalidateQueries({ queryKey: editing.section.queryKey });
            void queryClient.invalidateQueries({ queryKey: authKeys.isAdmin });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function EditorDialog({
  section,
  row,
  onClose,
  onSaved,
}: {
  section: SectionConfig;
  row: Record<string, unknown> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of section.fields) {
      const v = row?.[f.name];
      initial[f.name] = Array.isArray(v) ? (v as string[]).join(", ") : v == null ? "" : String(v);
    }
    return initial;
  });
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const missing = section.fields.find((f) => f.required && !(values[f.name] ?? "").trim());
    if (missing) {
      toast.error(`${missing.label} is required.`);
      return;
    }
    setBusy(true);
    try {
      const payload = toPayload(section.fields, values);
      if (row) {
        const { error } = await supabase
          .from(section.table)
          .update(payload as never)
          .eq("id", String(row["id"]));
        if (error) throw error;
        toast.success("Saved");
      } else {
        const { error } = await supabase.from(section.table).insert(payload as never);
        if (error) throw error;
        toast.success("Created");
      }
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-[var(--color-surface)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">
            {row ? `Edit ${section.label.replace(/s$/, "")}` : `New ${section.label.replace(/s$/, "")}`}
          </DialogTitle>
          <DialogDescription>Changes go live on the website immediately.</DialogDescription>
        </DialogHeader>
        <form onSubmit={save} className="grid gap-4">
          {section.fields.map((f) => (
            <div key={f.name} className="grid gap-2">
              <Label htmlFor={f.name}>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  id={f.name}
                  rows={3}
                  maxLength={2000}
                  value={values[f.name] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                />
              ) : (
                <Input
                  id={f.name}
                  maxLength={500}
                  value={values[f.name] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                />
              )}
            </div>
          ))}
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" disabled={busy}>
              {busy && <Loader2 className="size-4 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
