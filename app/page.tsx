import Link from "next/link";
import Image from "next/image";
import me from "@/imagees/me.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="font-bold text-base sm:text-lg">Charles Liggins</h1>

      <div className="flex-1 flex items-center justify-center pl-16 sm:pl-32 -mt-4">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <div className="max-w-md text-center sm:text-left space-y-6 leading-7">
            <p>
              I&rsquo;m Charles, a human driven to build efficient, accessible
              software that people love.
            </p>
            <p>
              I currently work at{" "}
              <a
                href="https://onme.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                On Me
              </a>{" "}
              and previously interned at <Link href="/work">Google</Link>
            </p>
            <p>I grew up in SoCal and I studied at Cornell</p>
          </div>

          <Image
            src={me}
            alt="Charles Liggins"
            placeholder="blur"
            sizes="(max-width: 640px) 200px, 240px"
            className="w-48 sm:w-60 h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
