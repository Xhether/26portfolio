import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getWorkEntries, getWorkEntry } from "@/lib/content";

export function generateStaticParams() {
  return getWorkEntries()
    .filter((e) => e.frontmatter.category === "project")
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const entry = getWorkEntry(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const entry = getWorkEntry(slug);
  if (!entry || entry.frontmatter.category !== "project") notFound();

  const { content } = await compileMDX({
    source: entry.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="space-y-6">
      <Link href="/work" className="text-sm">
        ← Work
      </Link>
      <header className="space-y-1">
        <h1 className="font-bold text-base sm:text-lg">
          {entry.frontmatter.title}
        </h1>
        {entry.frontmatter.description && (
          <p className="opacity-80">{entry.frontmatter.description}</p>
        )}
      </header>
      {entry.content.trim() ? (
        <div className="prose-mdx leading-7 space-y-4">{content}</div>
      ) : (
        <p className="opacity-70">Nothing here yet.</p>
      )}
    </article>
  );
}
