import Link from "next/link";
import { getBooks } from "@/lib/content";

export default function BooksPage() {
  const books = getBooks();

  return (
    <main className="shell">
      <div className="page-header">
        <Link href="/" className="back-link">
          חזרה לדף הבית
        </Link>
        <h1>ספרים</h1>
        <p className="lead">בחר ספר כדי להיכנס לתוכן העניינים ולקריאת הפרקים.</p>
      </div>

      <section className="card">
        <ol className="toc-list">
          {books.map((book) => (
            <li key={book.id} className="toc-item">
              <Link href={`/book/${book.id}`} className="toc-link">
                <span>{book.title}</span>
                <span className="toc-order">ספר</span>
              </Link>
              <p className="toc-summary">{book.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
