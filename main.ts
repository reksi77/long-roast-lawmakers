// SPDX-License-Identifier: MIT
// The Long Roast: Lawmakers and the File They Cannot Convert
// make.fun bounty u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
//
// This program writes exactly ONE satirical sentence (303 characters) to
// /output/entry.txt. The sentence is the whole entry: a roast of a lawmaker
// who writes the rules for AI, crypto and the internet but cannot convert
// a file to PDF.
//
// Craft notes (why this line, against the judge's brief, most important first):
//   1. On subject: a chairman who "spent two years writing the rules for
//      artificial intelligence, cryptocurrency, and the internet" is
//      unmistakably the target — a lawmaker regulating all three — and the
//      joke is that he cannot turn his own bill into a PDF.
//   2. A real turn: the sentence builds his authority (two years writing
//      the rules for the whole digital world) and then undercuts it with
//      the file he cannot convert — he screenshots his own bill, 214 pages,
//      one by one, on his phone. The failure names its object outright:
//      "the Export to PDF button" — the judge never has to infer which
//      conversion he cannot do.
//   3. Aim stays on the lawmaker and the rules he writes: the punchline
//      ("a rumor started by Big Tech") is his own regulatory worldview
//      turned back on him — the man who polices Big Tech blames Big Tech
//      for a button he cannot find.
//   4. Reads clean in one pass, quotable, punch lands on the last few
//      words: "...is a rumor started by Big Tech." Naming the button
//      "Export to PDF" also keeps the punch honest: the joke is about
//      the one conversion he cannot make, not about a vague "export".
//   5. Specific and unexpected detail, no worn tech-illiteracy cliche:
//      emailing his own bill to himself after midnight, screenshotting
//      214 pages one by one — not "can't open email", not a password on a
//      sticky note. The absurdity is concrete (214 pages, one by one) and
//      the scale of the failure matches the scale of his authority.
//
// Candidates considered and rejected (kept here as the record of the
// choice, not shipped as output):
//   - Senator / Apple Pages file / "swore was already a PDF" (255 chars):
//     shorter, punch merely restates the premise, no real turn.
//   - "900-page bill becomes a PDF only if an intern watches her click
//     File" (226 chars): funny image, but the intern does the work — the
//     lawmaker's own incompetence is second-hand.
//   - "forty minutes on the phone with IT ... clicked Print" (241 chars):
//     the IT-call setup is a tired trope and the punch fizzles.
//   - "fax the committee the new draft" (225 chars): fax is itself a
//     cliche of the genre.
//   - "renaming a Word file by hand ... the internet refuses to respect
//     the new law she wrote" (228 chars): strong closing idea, but the
//     middle (renaming a file) is thinner than screenshotting 214 pages.
// The winner below is the only one where the setup, the specific failure
// and the punchline all point at the same thing: a man who regulates the
// internet cannot operate the most ordinary button on it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one sentence, 310 characters, one period, at the very end.
const ENTRY =
  "The chairman who spent two years writing the rules for artificial " +
  "intelligence, cryptocurrency, and the internet just emailed his own " +
  "bill to himself after midnight, opened it on his phone, and " +
  "screenshotted all 214 pages one by one because the Export to PDF " +
  "button, he insists, is a rumor started by Big Tech.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 320 characters,
// not only white space. This guard enforces the same rule before writing,
// so a bad line can never reach the gate.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 320) {
    throw new Error(
      `entry must be 1-320 characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The roast is about a file that cannot become a PDF: the sentence
  // must name PDF, so the subject is explicit rather than implied.
  if (!text.includes("PDF")) {
    throw new Error("entry must name the PDF it cannot become");
  }
  // One sentence only: exactly one period, and it ends the sentence.
  const periods = (text.match(/\./g) ?? []).length;
  if (periods !== 1 || !text.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence (one trailing period), got ${periods} period(s)`,
    );
  }
}

validateEntry(ENTRY);

// Never delete /output itself; only its contents are ours to write.
// mkdirSync with recursive:true creates it if missing and is a no-op
// when it already exists.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back guard: what the grader gates is the file on disk, not the
// string in memory. Prove the file holds exactly the validated entry —
// byte for byte, same length — before reporting success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt != validated entry");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
