"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/involvements", label: "Involvements" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 right-8 sm:right-12 text-right text-sm sm:text-base leading-7">
      {links.map((link, i) => (
        <div key={link.href}>
          <Link
            href={link.href}
            className={isActive(pathname, link.href) ? "font-bold" : ""}
          >
            {link.label}
          </Link>
          {i < links.length - 1 && (
            <div aria-hidden className="select-none">|</div>
          )}
        </div>
      ))}
    </nav>
  );
}
