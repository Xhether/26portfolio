import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getWritingEntries, getWritingEntry } from "@/lib/content";

export function generateStaticParams() {
  return getWritingEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const entry = getWritingEntry(slug);
  if (!entry) return {};
  return { title: entry.frontmatter.title };
}

export default async function WritingPost(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const entry = getWritingEntry(slug);
  if (!entry) notFound();

  const { content } = await compileMDX({
    source: entry.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="space-y-6">
      <Link href="/writing" className="text-sm">
        ← Writing
      </Link>
      <header className="space-y-1">
        <h1 className="font-bold text-base sm:text-lg">
          {entry.frontmatter.title}
        </h1>
        <div className="text-sm opacity-70">{entry.frontmatter.date}</div>
      </header>
      <div className="prose-mdx leading-7 space-y-4">{content}</div>
    </article>
  );
}
