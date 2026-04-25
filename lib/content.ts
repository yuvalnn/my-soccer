import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "content", "books");

export type BookMetadata = {
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

export type BookWithChapters = BookMetadata & {
  chapters: Chapter[];
};

export type ChapterHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

function getBookDirectory(bookId: string) {
  return path.join(booksDirectory, bookId);
}

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

export function getBooks(): BookMetadata[] {
  const entries = fs
    .readdirSync(booksDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  return entries
    .map((entry) => {
      const filePath = path.join(booksDirectory, entry.name, "book.json");
      const fileContents = fs.readFileSync(filePath, "utf8");

      return JSON.parse(fileContents) as BookMetadata;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "he"));
}

export function getBook(bookId: string) {
  const filePath = path.join(getBookDirectory(bookId), "book.json");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  return JSON.parse(fileContents) as BookMetadata;
}

export function getChapters(bookId: string): Chapter[] {
  const bookDirectory = getBookDirectory(bookId);

  if (!fs.existsSync(bookDirectory)) {
    return [];
  }

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

export function getBookWithChapters(bookId: string): BookWithChapters | null {
  const book = getBook(bookId);

  if (!book) {
    return null;
  }

  return {
    ...book,
    chapters: getChapters(bookId)
  };
}

export function getChapterBySlug(bookId: string, slug: string) {
  return getChapters(bookId).find((chapter) => chapter.slug === slug) ?? null;
}

export function getAdjacentChapters(bookId: string, currentSlug: string) {
  const chapters = getChapters(bookId);
  const currentIndex = chapters.findIndex((chapter) => chapter.slug === currentSlug);

  return {
    previousChapter: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    nextChapter:
      currentIndex >= 0 && currentIndex < chapters.length - 1
        ? chapters[currentIndex + 1]
        : null
  };
}
