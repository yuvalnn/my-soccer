import Link from "next/link";
import { getBooks } from "@/lib/content";

export default function HomePage() {
  const books = getBooks();

  return (
    <main className="shell">
      <section className="card intro-card">
        <p className="eyebrow">MVP</p>
        <h1>אתר תוכן עברי מבוסס ספרים</h1>
        <p className="lead">
          בסיס מינימלי לאתר ספרי RTL עם תוכן ב-Markdown, תמיכה בפרקים ארוכים
          וניווט בין כמה ספרים.
        </p>
      </section>

      <section className="card" style={{ marginTop: "1.25rem" }}>
        <h2>בחירת ספר</h2>
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
