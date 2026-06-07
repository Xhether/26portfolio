import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type WorkFrontmatter = {
  title: string;
  role?: string;
  subteam?: string;
  start?: string;
  end?: string;
  category: "professional" | "project";
  order?: number;
  url?: string;
  description?: string;
};

export type WritingFrontmatter = {
  title: string;
  date: string;
  description?: string;
};

export type Entry<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

function readCollection<T>(folder: string): Entry<T>[] {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        frontmatter: data as T,
        content,
      };
    });
}

export function getWorkEntries(): Entry<WorkFrontmatter>[] {
  const entries = readCollection<WorkFrontmatter>("work");
  return entries.sort((a, b) => {
    if (a.frontmatter.order != null && b.frontmatter.order != null) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    const aDate = a.frontmatter.start ?? "";
    const bDate = b.frontmatter.start ?? "";
    return bDate.localeCompare(aDate);
  });
}

export function getWritingEntries(): Entry<WritingFrontmatter>[] {
  return readCollection<WritingFrontmatter>("writing").sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getWritingEntry(
  slug: string,
): Entry<WritingFrontmatter> | null {
  return getWritingEntries().find((e) => e.slug === slug) ?? null;
}

export function getWorkEntry(slug: string): Entry<WorkFrontmatter> | null {
  return getWorkEntries().find((e) => e.slug === slug) ?? null;
}

export function getInvolvementEntries(): Entry<WorkFrontmatter>[] {
  const entries = readCollection<WorkFrontmatter>("involvements");
  return entries.sort((a, b) => {
    if (a.frontmatter.order != null && b.frontmatter.order != null) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    return (b.frontmatter.start ?? "").localeCompare(
      a.frontmatter.start ?? "",
    );
  });
}
