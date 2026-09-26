#!/usr/bin/env node
// Renders the application markdown documents to print-ready A4 PDFs.
// Chrome headless is used instead of a PDF library so the output matches
// exactly what a browser prints - no new dependency required.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const DOCUMENTS = [
  { source: "resume.md", output: "Dedan_Okware_CV_UNICEF_HOPE.pdf" },
  { source: "cover-letter.md", output: "Dedan_Okware_Cover_Letter_UNICEF_HOPE.pdf" },
];

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const inline = (text) =>
  escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

/**
 * Converts the restricted markdown subset used by these documents:
 * headings, horizontal rules, unordered lists, paragraphs, bold and italic.
 */
export const markdownToHtml = (markdown) => {
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(`<ul>${listItems.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (line === "") {
      flushList();
      continue;
    }
    if (/^-{3,}$/.test(line)) {
      flushList();
      blocks.push("<hr>");
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushList();
      const level = heading[1].length;
      blocks.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const listItem = line.match(/^[-*]\s+(.*)$/);
    if (listItem) {
      listItems.push(listItem[1]);
      continue;
    }
    flushList();
    blocks.push(`<p>${inline(line)}</p>`);
  }
  flushList();

  return blocks.join("\n");
};

const PRINT_STYLES = `
  @page { size: A4; margin: 11mm 14mm; }
  :root {
    --ink: #1f2937;
    --ink-strong: #0f172a;
    --muted: #52606d;
    --accent: #1d4ed8;
    --rule: #cbd5e1;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #ffffff;
    color: var(--ink);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.3pt;
    line-height: 1.34;
  }
  h1 {
    margin: 0 0 2px;
    font-size: 22pt;
    letter-spacing: 1.2px;
    color: var(--ink-strong);
    text-transform: uppercase;
  }
  h2 {
    margin: 11px 0 5px;
    padding-bottom: 3px;
    border-bottom: 1.5px solid var(--accent);
    font-size: 11pt;
    letter-spacing: 0.8px;
    color: var(--ink-strong);
    text-transform: uppercase;
    break-after: avoid;
  }
  h3 {
    margin: 10px 0 1px;
    font-size: 10.8pt;
    color: var(--ink-strong);
    break-after: avoid;
  }
  p { margin: 0 0 6px; }
  h1 + p { color: var(--muted); font-size: 10.5pt; letter-spacing: 0.3px; }
  h3 + p em { color: var(--muted); font-size: 9.2pt; }
  hr { border: 0; border-top: 1px solid var(--rule); margin: 9px 0; }
  h1 + p + hr { margin-top: 8px; }
  ul { margin: 4px 0 8px; padding-left: 16px; }
  li { margin-bottom: 3px; break-inside: avoid; }
  strong { color: var(--ink-strong); }
  em { font-style: italic; }
`;

const buildDocument = (title, bodyHtml) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>${PRINT_STYLES}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

const findChrome = () => {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      `No Chrome or Chromium binary found. Looked in:\n  ${CHROME_CANDIDATES.join("\n  ")}`
    );
  }
  return found;
};

const renderPdf = (chrome, htmlPath, pdfPath) => {
  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "pipe" }
  );
};

const selfCheck = () => {
  const html = markdownToHtml("# Title\n\n**Bold** and *soft*.\n\n---\n\n- one\n- two\n");
  const expectations = [
    ["<h1>Title</h1>", "heading"],
    ["<strong>Bold</strong>", "bold"],
    ["<em>soft</em>", "italic"],
    ["<hr>", "rule"],
    ["<ul><li>one</li><li>two</li></ul>", "list"],
  ];
  for (const [fragment, label] of expectations) {
    if (!html.includes(fragment)) {
      throw new Error(`markdownToHtml self-check failed for ${label}: missing ${fragment}`);
    }
  }
  if (markdownToHtml("5 > 3 & rising").includes("&&")) {
    throw new Error("markdownToHtml self-check failed: double-escaped entities");
  }
};

const main = () => {
  selfCheck();
  const chrome = findChrome();

  for (const { source, output } of DOCUMENTS) {
    const sourcePath = join(HERE, source);
    if (!existsSync(sourcePath)) {
      throw new Error(`Missing source document: ${sourcePath}`);
    }

    const markdown = readFileSync(sourcePath, "utf8");
    const title = output.replace(/\.pdf$/, "").replace(/_/g, " ");
    const htmlPath = join(HERE, source.replace(/\.md$/, ".html"));
    const pdfPath = join(HERE, output);

    writeFileSync(htmlPath, buildDocument(title, markdownToHtml(markdown)), "utf8");
    renderPdf(chrome, htmlPath, pdfPath);

    console.log(`Rendered ${output}`);
  }
};

main();
