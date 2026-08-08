import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import seminarImg from "@/assets/event-seminar.jpg";
import dashboardImg from "@/assets/project-dashboard.jpg";
import aiImg from "@/assets/project-ai.jpg";

const fallbackImages = [hackathonImg, workshopImg, seminarImg, aiImg, dashboardImg];

/** Deterministic fallback artwork for rows without an uploaded image. */
export function imageFor(url: string | null | undefined, index: number) {
  return url && url.trim().length > 0 ? url : fallbackImages[index % fallbackImages.length]!;
}

export type ResourceRow = {
  id: string;
  title: string;
  type: string;
  description: string;
  link: string;
  sort_order: number;
};

export type EventRow = {
  id: string;
  title: string;
  category: string;
  date_label: string;
  venue: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

export type BlogRow = {
  id: string;
  title: string;
  author: string;
  date_label: string;
  read_time: string;
  tag: string;
  excerpt: string;
  sort_order: number;
};

export type GalleryRow = {
  id: string;
  caption: string;
  category: string;
  image_url: string | null;
  span: string;
  sort_order: number;
};

export type ProjectRow = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image_url: string | null;
  github: string | null;
  demo: string | null;
  sort_order: number;
};

export type ContentTable =
  | "resources"
  | "club_events"
  | "blogs"
  | "gallery_items"
  | "club_projects";

async function selectAll<T>(table: ContentTable) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}


export const contentKeys = {
  resources: ["content", "resources"] as const,
  events: ["content", "club_events"] as const,
  blogs: ["content", "blogs"] as const,
  gallery: ["content", "gallery_items"] as const,
  projects: ["content", "club_projects"] as const,
};

export function useResources() {
  return useQuery({ queryKey: contentKeys.resources, queryFn: () => selectAll<ResourceRow>("resources") });
}

export function useEvents() {
  return useQuery({ queryKey: contentKeys.events, queryFn: () => selectAll<EventRow>("club_events") });
}

export function useBlogs() {
  return useQuery({ queryKey: contentKeys.blogs, queryFn: () => selectAll<BlogRow>("blogs") });
}

export function useGallery() {
  return useQuery({ queryKey: contentKeys.gallery, queryFn: () => selectAll<GalleryRow>("gallery_items") });
}

export function useProjects() {
  return useQuery({ queryKey: contentKeys.projects, queryFn: () => selectAll<ProjectRow>("club_projects") });
}
