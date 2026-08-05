import { useEffect, useState } from "react";
import logo from "@/lib/logo";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-500"
      role="status"
      aria-label="Loading"
    >
      <div className="text-center">
        <div className="relative mx-auto size-20">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[var(--color-cyan)]/60" />
          <img
            src={logo}
            alt=""
            width={48}
            height={48}
            className="absolute inset-0 m-auto h-12 w-12 animate-pulse"
          />
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Initialising STIC
        </p>
      </div>
    </div>
  );
}
