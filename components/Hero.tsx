import Image from "next/image";
import portrait from "@/assets/portrait.png";

/**
 * Hand-drawn marks that sit around the portrait. Every value is a percentage of
 * the portrait box, so the whole cluster scales with it and stays put. The
 * source SVGs use preserveAspectRatio="none", so stretching to an exact width
 * and height is what the design intends.
 */
const doodles = [
  { src: "/doodles/doodle-v16.svg", left: 11.708, top: 13.269, width: 0.075, height: 4.927 },
  { src: "/doodles/doodle-v15.svg", left: 1.354, top: 16.009, width: 1.225, height: 0.988 },
  { src: "/doodles/doodle-v14.svg", left: -2.686, top: 24.497, width: 5.364, height: 0.164 },
  { src: "/doodles/doodle-v17.svg", left: 90.463, top: 81.243, width: 10.246, height: 18.219, tilt: 21.2 },
  { src: "/doodles/doodle-v18.svg", left: 96.619, top: 86.586, width: 2.76, height: 7.443, tilt: 21.2 },
  { src: "/doodles/doodle-v19.svg", left: 92.844, top: 103.82, width: 6.138, height: 4.698, tilt: 21.2 },
];

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[min(92vw,1900px)] px-6 pt-20 sm:px-10 md:pt-28 lg:px-16">
      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
        {/* In rem so the measure holds a steady character count as type grows. */}
        <div className="max-w-[41rem]">
          <h1 className="font-hand text-[clamp(2.5rem,7vw,4rem)] leading-none">
            I&rsquo;m Charles,
          </h1>

          <div className="mt-7 space-y-6 text-[clamp(1.05rem,1.9vw,1.5rem)] leading-snug">
            <p>
              a human driven to build efficient, accessible software that people
              actually love.
            </p>
            <p>This is my digital dump.</p>
            <p>
              I currently work at{" "}
              <a
                className="underline decoration-from-font underline-offset-2 hover:opacity-70"
                href="#work"
              >
                Nowadays
              </a>{" "}
              and previously interned at{" "}
              <a
                className="underline decoration-from-font underline-offset-2 hover:opacity-70"
                href="https://onme.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                On Me
              </a>{" "}
              and{" "}
              <a
                className="underline decoration-from-font underline-offset-2 hover:opacity-70"
                href="#work"
              >
                Google
              </a>
              .
            </p>
            <p>I grew up in SoCal and I studied at Cornell.</p>
          </div>
        </div>

        {/* Portrait box. The photo is tilted inside it; the doodles are not. */}
        <div className="relative mx-auto aspect-[483.942/560.676] w-[min(78vw,25rem)] md:mx-0 md:w-[min(34vw,34rem)]">
          <Image
            src={portrait}
            alt="Charles Liggins"
            className="absolute left-[8.714%] top-[5.8%] h-[88.398%] w-[82.571%] -rotate-[10.6deg] object-contain"
            sizes="(max-width: 768px) 78vw, 34vw"
            loading="eager"
            fetchPriority="high"
          />

          {doodles.map((doodle) => (
            <Image
              key={doodle.src}
              src={doodle.src}
              alt=""
              aria-hidden
              width={32}
              height={32}
              unoptimized
              className="absolute"
              style={{
                left: `${doodle.left}%`,
                top: `${doodle.top}%`,
                width: `${doodle.width}%`,
                height: `${doodle.height}%`,
                transform: doodle.tilt ? `rotate(${doodle.tilt}deg)` : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
