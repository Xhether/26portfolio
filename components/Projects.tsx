"use client";

import { useState } from "react";
import Image from "next/image";
import { projects, defaultProjectIndex } from "@/lib/data";

/**
 * Where the out-of-focus projects sit, as percentages of the stage width.
 * Each one tucks partly behind the featured panel (which spans 19%–81%), so
 * only its outer edge shows. The nearer pair sits in front of the far pair.
 */
const peeks = [
  { offset: -2, left: "6.6%", width: "9%", height: "58.1%", layer: "z-0" },
  { offset: -1, left: "10%", width: "15%", height: "75.5%", layer: "z-[1]" },
  { offset: 1, left: "75%", width: "15%", height: "75.5%", layer: "z-[1]" },
  { offset: 2, left: "84.4%", width: "9%", height: "58.1%", layer: "z-0" },
];

/*
 * Inset with `left-4 sm:left-6` rather than `left-0`: absolute offsets resolve
 * against the stage's padding box, so `left-0` would sit flush against the
 * viewport edge and ignore the stage's own horizontal padding.
 */
const arrowClasses =
  "absolute top-1/2 z-20 flex h-[clamp(4.5rem,17%,8.7rem)] w-[clamp(2rem,3.4%,3rem)] -translate-y-1/2 items-center justify-center rounded-[12px] border-4 border-ink bg-paper transition hover:bg-tag-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Projects() {
  const [index, setIndex] = useState(
    defaultProjectIndex === -1 ? 0 : defaultProjectIndex,
  );

  const count = projects.length;
  const wrap = (value: number) => ((value % count) + count) % count;
  const featured = projects[index];

  return (
    <section id="projects" className="mt-28 md:mt-40">
      <h2 className="text-center font-hand text-[clamp(2.25rem,5.5vw,4rem)] leading-none">
        Projects
      </h2>

      {/* Tracks the viewport rather than capping at the 1432-wide Figma stage,
          so the carousel keeps pace with the rest of the page on a big
          display. The ceiling only stops it running away on an ultrawide. */}
      <div className="relative mx-auto mt-12 w-full max-w-[min(94vw,2000px)] px-4 sm:px-6">
        {/* Neighbouring projects, tucked behind the featured panel. */}
        {peeks.map((peek) => {
          const project = projects[wrap(index + peek.offset)];

          return (
            <button
              key={peek.offset}
              type="button"
              onClick={() => setIndex(wrap(index + peek.offset))}
              aria-label={`Show ${project.title}`}
              className={`group absolute top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-[20px] border-[3px] border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:block ${peek.layer}`}
              style={{
                left: peek.left,
                width: peek.width,
                height: peek.height,
              }}
            >
              {/* Only the out-of-frame projects are dimmed — the featured one
                  below renders at full strength. */}
              <Image
                src={project.images[0]}
                alt=""
                aria-hidden
                fill
                className="object-cover brightness-[0.55] transition duration-200 group-hover:brightness-90"
                sizes="240px"
              />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIndex(wrap(index - 1))}
          className={`${arrowClasses} left-4 sm:left-6`}
          aria-label="Previous project"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 4 7 12l8 8" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setIndex(wrap(index + 1))}
          className={`${arrowClasses} right-4 sm:right-6`}
          aria-label="Next project"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m9 4 8 8-8 8" />
          </svg>
        </button>

        {/*
          The featured project sits in flow and so sets the stage height.
          It is a container, and everything inside is measured in `cqw` — 1% of
          the panel's own width. Borders, gaps and padding therefore scale with
          the panel instead of staying at a fixed pixel size, which is what kept
          the three phones from overflowing at some browser zoom levels.
        */}
        <div className="liquid-glass @container relative z-10 mx-auto aspect-[869/568] w-[82%] rounded-[24px] lg:w-[62%]">
          {/*
            Padding and gap live on this inner row, not on the panel itself.
            `cqw` resolves against the nearest *ancestor* container, so a
            container's own padding in `cqw` silently falls back to viewport
            units and stops tracking the panel. Measured from a child it
            correctly means "1% of the panel width".
          */}
          <div className="flex h-full w-full items-center justify-center gap-[3cqw] p-[2.8cqw]">
            {featured.images.map((image, imageIndex) => (
              <Image
                key={image.src}
                src={image}
                alt={imageIndex === 0 ? featured.alt : ""}
                aria-hidden={imageIndex !== 0}
                /*
                  Fit inside the panel on whichever axis binds first. Tall phone
                  screenshots end up height-limited; wide diagrams and posters
                  end up width-limited. Leaving both dimensions `auto` under a
                  max on each keeps the aspect ratio intact, so the border still
                  hugs the artwork instead of framing a letterboxed box.
                */
                className="h-auto max-h-full w-auto max-w-full rounded-[2.3cqw] border-[0.7cqw] border-ink object-contain"
                sizes="(max-width: 1024px) 80vw, 900px"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Details for whichever project is in focus. */}
      <div
        className="mx-auto mt-10 w-full max-w-[60rem] px-6"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-hand text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none">
            {featured.title}
          </h3>
          {featured.links.length > 0 && (
            <p className="text-[clamp(0.9rem,1.35vw,1.25rem)]">
              Links:{" "}
              {featured.links.map((link, linkIndex) => (
                <span key={link.label}>
                  {linkIndex > 0 && ", "}
                  <a
                    className="underline decoration-from-font underline-offset-2 hover:opacity-70"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- a decorative
            rule that has to stretch to any width; next/image would letterbox it. */}
        <img
          src="/doodles/divider.svg"
          alt=""
          aria-hidden
          className="mt-3 h-1 w-full"
        />

        <div className="mt-6 space-y-4 text-[clamp(0.9rem,1.15vw,1rem)] leading-normal text-muted">
          {featured.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="opacity-70">{featured.stack.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}
