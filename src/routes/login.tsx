import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { AuroraBackground } from "@/components/site/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/lib/logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — STIC Tech Hub Member Portal" },
      {
        name: "description",
        content:
          "Sign in or create a STIC Tech Hub member account to manage events, achievements and club content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Sign in — STIC Tech Hub Member Portal" },
      { property: "og:description", content: "Member and admin access to the club portal." },
    ],
  }),
  component: Login,
});

function Login() {
  const demo = (label: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`${label} is a UI demo`, {
      description: "Authentication isn't connected yet — the dashboard is open for preview.",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AuroraBackground particles={22} />
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-2">
        {/* brand panel */}
        <div className="hidden lg:block">
          <img src={logo} alt="STIC Tech Hub logo" width={72} height={72} className="size-18 rounded-full" />
          <h1 className="mt-8 text-balance text-4xl font-bold leading-tight">
            Welcome back to <span className="gradient-text">STIC Tech Hub</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Manage events, publish achievements and keep the club's story current — all from one
            console.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            {["Role-based member portal", "Event & achievement management", "Testimonial moderation"].map(
              (f) => (
                <li key={f} className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-[var(--color-cyan)]" /> {f}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* auth card */}
        <div className="glass gradient-border mx-auto w-full max-w-md rounded-3xl p-7 sm:p-9">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Back to site
          </Link>

          <Tabs defaultValue="login" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={demo("Sign in")} className="mt-6 grid gap-5">
                <IconField id="login-email" label="Email" type="email" Icon={Mail} placeholder="you@university.edu" />
                <IconField id="login-password" label="Password" type="password" Icon={Lock} placeholder="••••••••" />
                <Button type="submit" variant="hero" size="lg">
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={demo("Sign up")} className="mt-6 grid gap-5">
                <IconField id="signup-name" label="Full name" Icon={User} placeholder="Ananya Sharma" />
                <IconField id="signup-email" label="Email" type="email" Icon={Mail} placeholder="you@university.edu" />
                <IconField id="signup-password" label="Password" type="password" Icon={Lock} placeholder="Minimum 8 characters" />
                <Button type="submit" variant="hero" size="lg">
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 rounded-xl border border-border p-4 text-xs text-muted-foreground">
            Frontend preview only — no backend connected. Explore the{" "}
            <Link to="/admin" className="text-[var(--color-cyan)] hover:underline">
              admin dashboard
            </Link>{" "}
            directly.
          </div>
        </div>
      </div>
    </section>
  );
}

function IconField({
  id,
  label,
  Icon,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input id={id} type={type} placeholder={placeholder} className="h-11 pl-10" />
      </div>
    </div>
  );
}
