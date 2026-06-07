import Link from "next/link";
import { getWritingEntries } from "@/lib/content";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  const entries = getWritingEntries();

  return (
    <div className="space-y-8">
      <h2 className="font-bold text-base sm:text-lg">Writing</h2>

      <div className="space-y-6">
        {entries.map((entry) => (
          <article key={entry.slug}>
            <Link
              href={`/writing/${entry.slug}`}
              className="font-bold no-underline hover:underline"
            >
              {entry.frontmatter.title} - {entry.frontmatter.date}
            </Link>
            {entry.frontmatter.description && (
              <p className="mt-1">{entry.frontmatter.description}</p>
            )}
          </article>
        ))}
        {entries.length === 0 && (
          <p className="opacity-70">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
