import { notFound } from "next/navigation";
import { getBook, getBooks, getChapterBySlug, getChapters } from "@/lib/content";
import { ChapterNavigation } from "@/components/ChapterNavigation";
import { ChapterTableOfContents } from "@/components/ChapterTableOfContents";
import { MarkdownContent } from "@/components/MarkdownContent";

type ChapterPageProps = {
  params: Promise<{
    book: string;
    chapter: string;
  }>;
};

export function generateStaticParams() {
  return getBooks().flatMap((book) =>
    getChapters(book.id).map((chapter) => ({
      book: book.id,
      chapter: chapter.slug
    }))
  );
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { book: bookId, chapter: chapterSlug } = await params;
  const book = getBook(bookId);
  const chapter = getChapterBySlug(bookId, chapterSlug);

  if (!book || !chapter) {
    notFound();
  }

  return (
    <main className="shell">
      <article className="card article-card">
        <header className="article-header">
          <p className="eyebrow">{book.title}</p>
          <h1>{chapter.title}</h1>
          <p className="lead">{chapter.summary}</p>
        </header>

        <ChapterTableOfContents headings={chapter.headings} />

        <MarkdownContent content={chapter.content} headings={chapter.headings} />

        <ChapterNavigation bookId={bookId} currentSlug={chapter.slug} />
      </article>
    </main>
  );
}
