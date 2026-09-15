import type { StaticImageData } from "next/image";

import nowadaysShot from "@/assets/work/nowadays.png";
import googleShot from "@/assets/work/google.png";
import onMeShot from "@/assets/work/on-me.png";

import resell1 from "@/assets/projects/resell-1.png";
import resell2 from "@/assets/projects/resell-2.png";
import resell3 from "@/assets/projects/resell-3.png";
import kvStore from "@/assets/projects/kv-store.png";
import etaCompiler from "@/assets/projects/eta-compiler.png";
import sssp from "@/assets/projects/sssp.png";
import urmc from "@/assets/projects/urmc.png";

export type Job = {
  company: string;
  role: string;
  /** Sub-team, on its own line so the sticker stays compact. */
  team?: string;
  period: string;
  location: string;
  image: StaticImageData;
  alt: string;
  /** Sticker colour behind the label. */
  tone: "blue" | "pink" | "violet";
  /** Degrees of tilt, straight off the Figma canvas. */
  tilt: number;
};

export type Project = {
  slug: string;
  title: string;
  images: StaticImageData[];
  alt: string;
  /** Rendered as a muted line under the write-up. */
  stack: string[];
  links: { label: string; href: string }[];
  description: string[];
};

export const jobs: Job[] = [
  {
    company: "Nowadays",
    role: "Product Engineer",
    period: "August 2026 - Present",
    location: "San Francisco, CA",
    image: nowadaysShot,
    alt: "A Nowadays venue page showing nearby airports, an Austin map, nightly rate and proposal request.",
    tone: "blue",
    tilt: 6.57,
  },
  {
    company: "Google",
    role: "Software Engineering Intern",
    team: "YouTube Languages Infrastructure",
    period: "May 2025 - August 2025",
    location: "Cambridge, MA",
    image: googleShot,
    alt: "A Google Colab notebook open to a beginner contest workbook.",
    tone: "pink",
    tilt: -12.05,
  },
  {
    company: "On Me",
    role: "iOS Software Engineering Intern",
    period: "May 2026 - August 2026",
    location: "SoHo, New York, New York",
    image: onMeShot,
    alt: "The On Me gift feed, showing thoughtful gift cards and stories.",
    tone: "violet",
    tilt: 2.52,
  },
];

/*
 * Carousel order matches the Figma layout: two projects peek in from the left,
 * two from the right, and Resell sits in the middle as the default slide.
 */
export const projects: Project[] = [
  {
    slug: "kv-store",
    title: "Distributed Sharded Key Value Store",
    images: [kvStore],
    alt: "A Paxos deployment diagram: clients, replicas, leaders and a row of five acceptors, fully interconnected.",
    stack: ["Java", "Distributed Systems", "Databases", "Observability"],
    links: [],
    description: [
      "A linearizable, fault-tolerant key-value store supporting transactions, built on a variation of the Paxos algorithm for consensus and distributed scheduling across multiple servers in real time. Clients issue commands to replicas, which drive them through leaders to a quorum of acceptors.",
      "State machine replication over heartbeat pings keeps the cluster safe and live as requests flood in. Horizontal sharding — with two-phase commit across shards — allows load balancing and safe reconfigurations for system-wide scalability.",
    ],
  },
  {
    slug: "eta-compiler",
    title: "Eta Toy Compiler",
    images: [etaCompiler],
    alt: "An architecture diagram of a hosted compiler service: a load balancer over nginx and Express instances, an nsjail-sandboxed compile queue, and GitHub Actions driving per-toolchain build containers.",
    stack: ["Rust", "x86-64 Assembly"],
    links: [],
    description: [
      "A compiler spanning lexing, parsing, type checking, IR optimization and code generation. Register allocation is built on an interference graph over abstract register nodes, held as both an adjacency set and an adjacency list.",
      "Rust's algebraic types, exhaustive pattern matching and Result-based error propagation model every stage of the pipeline with compiler-enforced correctness and zero unsafe code.",
    ],
  },
  {
    slug: "resell",
    title: "Resell",
    images: [resell1, resell2, resell3],
    alt: "Three Resell app screens: recent listings, shop by category, and availability settings.",
    stack: ["TypeScript", "SwiftUI", "Node.js", "Firestore", "Figma"],
    links: [
      {
        label: "Github Repository",
        href: "https://github.com/cuappdev/resell-ios",
      },
    ],
    description: [
      "Resell is a secondhand marketplace made for and by Cornell students. I wore multiple hats working on Resell, putting in hundreds of hours of work as a designer and full-stack developer on this project.",
      "College campuses produce tons of waste on a yearly basis, and Cornell notoriously struggles in this category. Resell is a giant step forward in improving sustainability and community on campus.",
      "It now serves 1,000+ students monthly across iOS and Android. I built out availability sharing end to end, stood up a CI/CD pipeline on Vercel, Github Actions and Xcode Cloud, and replaced our third-party search and embedding dependencies with an in-house Approximate Nearest Neighbors implementation — cutting ML latency by over 50% and letting the whole thing scale serverless.",
    ],
  },
  {
    slug: "sssp",
    title: "Parallel BFS & Single-Source Shortest Paths",
    images: [sssp],
    alt: "A research poster comparing 1D and 2D partitioned parallel BFS, with strong scaling and communication time charts.",
    stack: ["C++", "MPI", "CSR", "Parallel / HPC"],
    links: [
      {
        label: "Github Repository",
        href: "https://github.com/Xhether/cs5220-project",
      },
    ],
    description: [
      "Distributed breadth-first search and single-source shortest paths over large sparse graphs, asking how the adjacency matrix should be partitioned across MPI ranks to minimise communication. A 1D row-block layout, whose collectives scale as O(p) per BFS level, is compared against a 2D checkerboard layout, whose collectives scale as O(√p).",
      "Benchmarked with strong scaling on the LiveJournal graph — 39.97 million nodes, 34.68 million undirected edges, a diameter of 17 — measuring traversed edges per second, total runtime and average communication time out to 256 ranks. Joint work with Felix Grimm and David Valarezo for CS 5220: High Performance Computing.",
    ],
  },
  {
    slug: "urmc",
    title: "Underrepresented Minorities in Computing",
    images: [urmc],
    alt: "A grid of URMC featured event posters: bowling social, Shark Tank startups, March G-Body, trivia night, career quest and prelim reviews.",
    stack: ["Web", "Community"],
    links: [{ label: "Website", href: "https://urmc.cs.cornell.edu" }],
    description: [
      "URMC builds a supportive community at Cornell where underrepresented students in computing can find success.",
      "Programming runs from the technical to the social — Computing Career Quest, Shark Tank: Startups 101, CS 1110 and 2110 prelim reviews, and G-Body talks on imposter syndrome, alongside bowling socials and M&M trivia nights.",
    ],
  },
];

/** Resell is the slide the design opens on. */
export const defaultProjectIndex = projects.findIndex(
  (project) => project.slug === "resell",
);
