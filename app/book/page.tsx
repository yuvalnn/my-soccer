import Link from "next/link";
import { getBook, getChapters } from "@/lib/content";

export default function BookPage() {
  const book = getBook();
  const chapters = getChapters();

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
          {chapters.map((chapter) => (
            <li key={chapter.slug} className="toc-item">
              <Link href={`/book/${chapter.slug}`} className="toc-link">
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
