import Link from "next/link";
import { getWorkEntries, type WorkFrontmatter, type Entry } from "@/lib/content";

export const metadata = { title: "Work" };

function formatRange(start?: string, end?: string) {
  if (!start && !end) return null;
  return `${start ?? ""} - ${end ?? "Present"}`;
}

function ProfessionalItem({ entry }: { entry: Entry<WorkFrontmatter> }) {
  const { title, role, subteam, start, end } = entry.frontmatter;
  const range = formatRange(start, end);
  return (
    <div>
      <div className="leading-7">
        <span className="font-bold">{title}</span>
        {subteam && (
          <>
            {" | "}
            <span>{subteam}</span>
          </>
        )}
        {role && (
          <>
            {" | "}
            <span>{role}</span>
          </>
        )}
      </div>
      {range && <div className="text-sm opacity-80">{range}</div>}
      {entry.content.trim() && (
        <div className="mt-2 whitespace-pre-line">{entry.content.trim()}</div>
      )}
    </div>
  );
}

function ProjectItem({ entry }: { entry: Entry<WorkFrontmatter> }) {
  const blurb = entry.frontmatter.description ?? entry.content.trim();
  return (
    <div>
      <Link
        href={`/work/${entry.slug}`}
        className="font-bold leading-7 no-underline hover:underline"
      >
        {entry.frontmatter.title}
      </Link>
      {blurb && <div className="whitespace-pre-line">{blurb}</div>}
    </div>
  );
}

export default function WorkPage() {
  const entries = getWorkEntries();
  const professional = entries.filter(
    (e) => e.frontmatter.category === "professional",
  );
  const projects = entries.filter(
    (e) => e.frontmatter.category === "project",
  );

  return (
    <div className="space-y-12">
      {professional.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-bold text-base sm:text-lg">Professional</h2>
          {professional.map((entry) => (
            <ProfessionalItem key={entry.slug} entry={entry} />
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-bold text-base sm:text-lg">Everything Else</h2>
          {projects.map((entry) => (
            <ProjectItem key={entry.slug} entry={entry} />
          ))}
        </section>
      )}
    </div>
  );
}
