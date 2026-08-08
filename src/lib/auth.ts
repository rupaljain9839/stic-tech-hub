import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const authKeys = {
  session: ["auth", "session"] as const,
  isAdmin: ["auth", "is-admin"] as const,
};

export function useSession() {
  return useQuery<Session | null>({
    queryKey: authKeys.session,
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session ?? null;
    },
    staleTime: 30_000,
  });
}

export function useIsAdmin(enabled: boolean) {
  return useQuery({
    queryKey: authKeys.isAdmin,
    enabled,
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return Boolean(data);
    },
  });
}
