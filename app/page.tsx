import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="card intro-card">
        <p className="eyebrow">MVP</p>
        <h1>אתר תוכן עברי מבוסס ספר</h1>
        <p className="lead">
          זהו בסיס מינימלי לאתר ספר RTL עם תוכן ב-Markdown, ניווט בין פרקים
          ותמיכה בתמונות בתוך הפרקים.
        </p>
        <Link href="/book" className="primary-link">
          לעמוד הספר
        </Link>
      </section>
    </main>
  );
}
