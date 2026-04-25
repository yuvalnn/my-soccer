import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookWithChapters, getBooks } from "@/lib/content";

type BookPageProps = {
  params: Promise<{
    book: string;
  }>;
};

export function generateStaticParams() {
  return getBooks().map((book) => ({
    book: book.id
  }));
}

export default async function BookPage({ params }: BookPageProps) {
  const { book: bookId } = await params;
  const book = getBookWithChapters(bookId);

  if (!book) {
    notFound();
  }

  return (
    <main className="shell">
      <div className="page-header">
        <Link href="/" className="back-link">
          חזרה לדף הבית
        </Link>
        <h1>{book.title}</h1>
        <p className="lead">{book.description}</p>
      </div>

      <section className="card">
        <h2>תוכן העניינים</h2>
        <ol className="toc-list">
          {book.chapters.map((chapter) => (
            <li key={chapter.slug} className="toc-item">
              <Link href={`/book/${book.id}/${chapter.slug}`} className="toc-link">
                <span>{chapter.title}</span>
                <span className="toc-order">פרק {chapter.order}</span>
              </Link>
              <p className="toc-summary">{chapter.summary}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
