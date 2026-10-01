// Curated copy for the home page. Images and links come from the project
// store so the two can't drift; this file only holds what the home page says.

export interface FeaturedProject {
  name: string; // must match a project name in store/store.ts
  kind: string;
  summary: string;
  proof: string;
}

export const featured: FeaturedProject[] = [
  {
    name: "Rasko Sweet Scent",
    kind: "Client work",
    summary:
      "The business system for a eucalyptus grower in Nakuru. Offline-first on Windows and Android, synced to the cloud, with the public website alongside.",
    proof: "Developed by okwaretech (okwaretech.com)",
  },
  {
    name: "OHMS 2.0 - Autonomous Agent Platform",
    kind: "Platform",
    summary:
      "AI agents composed from plain-language goals, running as Internet Computer canisters with verifiable on-chain execution.",
    proof: "2nd place in WCHL Kenya and Africa, Global Finale",
  },
  {
    name: "U-Download",
    kind: "Desktop product",
    summary:
      "A media downloader with a Rust and Tauri core that bundles its own tooling, so it installs and works with nothing else on the machine.",
    proof: "Used by 1,500+ people on Linux, Windows and macOS",
  },
  {
    name: "Gitok",
    kind: "Open source",
    summary:
      "35+ Git commands with safety prompts, an interactive cheatsheet and self-updates, released through an automated pipeline.",
    proof: "Adopted by 2,000+ developers in 40+ countries",
  },
  {
    name: "RSON - Rust Serialized Object Notation",
    kind: "Open source",
    summary:
      "A superset of JSON with comments, structs, enums and optionals. Every JSON file is valid RSON, with parsers for Rust, TypeScript and Python.",
    proof: "Spec plus parsers in three languages",
  },
  {
    name: "IThreeM - Decentralized Gaming Engine",
    kind: "Engine",
    summary:
      "A 2D and 3D game engine that runs on the Internet Computer, with on-chain assets and in-game transactions.",
    proof: "Rust, Motoko and WebGL",
  },
];

export interface Figure {
  value: string;
  label: string;
}

export const figures: Figure[] = [
  { value: "50,000+", label: "monthly users served by APIs I designed and built" },
  { value: "9,000+", label: "developers trained across three cohorts" },
  { value: "3,500+", label: "developers using my open-source tools" },
];

export interface CratePackage {
  name: string; // crates.io crate name, also its URL slug
  summary: string;
  downloads: number; // all-time count from crates.io, read 2026-10-01
}

export const CRATES_PROFILE = "https://crates.io/users/okwareddevnest";

export const packages: CratePackage[] = [
  {
    name: "ohms-adaptq",
    summary: "LLM quantization CLI built on NOVAQ, so large models run on local hardware.",
    downloads: 4848,
  },
  {
    name: "vaultarq",
    summary: "Rust SDK for Vaultarq, a developer-first secrets manager.",
    downloads: 3918,
  },
  {
    name: "dfxmon-cli",
    summary: "CLI for the dfxmon canister on the Internet Computer.",
    downloads: 2339,
  },
  { name: "rson-core", summary: "Core parsing and value types for RSON.", downloads: 1886 },
  { name: "serde_rson", summary: "Serde integration for RSON.", downloads: 1375 },
  { name: "rson-schema", summary: "Schema validation for RSON.", downloads: 1010 },
  { name: "rson-cli", summary: "Command-line tools for RSON.", downloads: 974 },
];

export interface Discipline {
  title: string;
  body: string;
}

// What I ship to production, in the order the resume presents it.
export const disciplines: Discipline[] = [
  {
    title: "Frontend",
    body: "Lead Front End Engineer at Fingo Africa: stablecoin wallets, cross-border transfers and KYC onboarding in Next.js and React.",
  },
  {
    title: "Technical leadership",
    body: "Tech Lead at Power Learn Project Africa, leading the revamp of core systems and setting engineering standards.",
  },
  {
    title: "Backend",
    body: "APIs and services in Rust, Go, Node.js and Python, with CI/CD and the operations work that keeps them up.",
  },
  {
    title: "Mobile",
    body: "Flutter apps for Fingo Africa, and Tauri apps for Android and desktop, including Rasko Sweet Scent and U-Download.",
  },
  {
    title: "Blockchain",
    body: "ICP smart contracts at Bonded for tamper-proof evidence storage, plus Solidity and Motoko in my own products.",
  },
];
