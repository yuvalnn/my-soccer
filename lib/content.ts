import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const bookDirectory = path.join(
  process.cwd(),
  "content",
  "books",
  "hebrew-book"
);

type BookMetadata = {
  id: string;
  title: string;
  description: string;
  language: string;
  direction: "rtl" | "ltr";
};

type ChapterFrontmatter = {
  title: string;
  slug: string;
  order: number;
  summary: string;
};

export type Chapter = ChapterFrontmatter & {
  content: string;
  headings: ChapterHeading[];
};

export type ChapterHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

function readMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  return matter(fileContents);
}

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): ChapterHeading[] {
  const matches = content.matchAll(/^(##|###|####)\s+(.+)$/gm);

  return Array.from(matches).map((match) => ({
    id: slugifyHeading(match[2]),
    text: match[2].trim(),
    level: match[1].length as 2 | 3 | 4
  }));
}

export function getBook() {
  const filePath = path.join(bookDirectory, "book.json");
  const fileContents = fs.readFileSync(filePath, "utf8");

  return JSON.parse(fileContents) as BookMetadata;
}

export function getChapters(): Chapter[] {
  const entries = fs
    .readdirSync(bookDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  const chapters = entries.map((fileName) => {
    const filePath = path.join(bookDirectory, fileName);
    const { data, content } = readMarkdownFile(filePath);

    return {
      ...(data as ChapterFrontmatter),
      content,
      headings: extractHeadings(content)
    };
  });

  return chapters.sort((a, b) => a.order - b.order);
}

export function getChapterBySlug(slug: string) {
  return getChapters().find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(currentSlug: string) {
  const chapters = getChapters();
  const currentIndex = chapters.findIndex((chapter) => chapter.slug === currentSlug);

  return {
    previousChapter: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    nextChapter:
      currentIndex >= 0 && currentIndex < chapters.length - 1
        ? chapters[currentIndex + 1]
        : null
  };
}
