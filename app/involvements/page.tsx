import { getInvolvementEntries } from "@/lib/content";

export const metadata = { title: "Involvements" };

export default function InvolvementsPage() {
  const entries = getInvolvementEntries();

  return (
    <div className="space-y-8">
      <h2 className="font-bold text-base sm:text-lg">Involvements</h2>

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.slug}>
            <div className="leading-7">
              <span className="font-bold">{entry.frontmatter.title}</span>
              {entry.frontmatter.role && (
                <>
                  {" | "}
                  <span>{entry.frontmatter.role}</span>
                </>
              )}
            </div>
            {(entry.frontmatter.start || entry.frontmatter.end) && (
              <div className="text-sm opacity-80">
                {entry.frontmatter.start ?? ""} -{" "}
                {entry.frontmatter.end ?? "Present"}
              </div>
            )}
            {entry.content.trim() && (
              <div className="mt-2 whitespace-pre-line">
                {entry.content.trim()}
              </div>
            )}
          </div>
        ))}
        {entries.length === 0 && (
          <p className="opacity-70">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}
