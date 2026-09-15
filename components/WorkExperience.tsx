import Image from "next/image";
import type { CSSProperties } from "react";
import { jobs } from "@/lib/data";

const toneClasses = {
  blue: "bg-tag-blue",
  pink: "bg-tag-pink",
  violet: "bg-tag-violet",
} as const;

/**
 * Scatter positions, as percentages of the 1512x825 region the three cards
 * occupy on the Figma canvas. `--card-*` places the photo, `--label-*` places
 * the sticker relative to that photo. Below `lg` these are ignored and the
 * cards simply stack (see .work-scatter in globals.css).
 */
const layout = [
  {
    card: { left: "12.554%", top: "6.22%", width: "34.667%", aspect: "524.165 / 299.371" },
    label: { left: "-3.964%", top: "98.537%", width: "49.949%" },
  },
  {
    card: { left: "60.275%", top: "4.725%", width: "26.825%", aspect: "405.586 / 304.862" },
    label: { left: "34.744%", top: "97.949%", width: "75.283%" },
  },
  {
    card: { left: "32.848%", top: "54.584%", width: "34.494%", aspect: "521.546 / 301.548" },
    label: { left: "-2.002%", top: "102.298%", width: "60.775%" },
  },
];

export default function WorkExperience() {
  return (
    <section id="work" className="mt-28 md:mt-40">
      <h2 className="text-center font-hand text-[clamp(2.25rem,5.5vw,4rem)] leading-none">
        Work Experience
      </h2>

      <div className="work-scatter mx-auto mt-14 w-full max-w-[1512px] px-6 sm:px-10 lg:mt-8 lg:px-0">
        {jobs.map((job, index) => {
          const { card, label } = layout[index];

          return (
            <article
              key={job.company}
              className="work-card"
              style={
                {
                  "--tilt": `${job.tilt}deg`,
                  "--card-l": card.left,
                  "--card-t": card.top,
                  "--card-w": card.width,
                } as CSSProperties
              }
            >
              <div
                className="work-frame relative w-full rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                style={{ aspectRatio: card.aspect }}
              >
                <Image
                  src={job.image}
                  alt={job.alt}
                  fill
                  className="rounded-[12px] object-cover"
                  sizes="(max-width: 1024px) 90vw, 35vw"
                />
                {/* Border lives on its own layer so the roughening filter
                    wobbles the stroke without smearing the screenshot. */}
                <div
                  aria-hidden
                  className="rough-edge absolute inset-0 rounded-[12px] border-4 border-ink"
                />
              </div>

              <div
                className={`work-label rounded-[12px] border-4 border-ink px-3 py-1.5 ${toneClasses[job.tone]}`}
                style={
                  {
                    "--label-l": label.left,
                    "--label-t": label.top,
                    "--label-w": label.width,
                  } as CSSProperties
                }
              >
                <p className="leading-tight">
                  <span className="text-[clamp(0.95rem,1.35vw,1.25rem)] font-semibold">
                    {job.company}
                  </span>
                  <span className="text-[clamp(0.7rem,0.85vw,0.75rem)] font-semibold">
                    , {job.role}
                  </span>
                </p>
                {job.team && (
                  <p className="text-[clamp(0.7rem,0.85vw,0.75rem)] leading-tight opacity-75">
                    {job.team}
                  </p>
                )}
                <p className="text-[clamp(0.7rem,0.85vw,0.75rem)] leading-tight">
                  {job.period} | {job.location}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
