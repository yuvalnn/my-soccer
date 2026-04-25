import Link from "next/link";
import { getAdjacentChapters } from "@/lib/content";

type ChapterNavigationProps = {
  bookId: string;
  currentSlug: string;
};

export function ChapterNavigation({
  bookId,
  currentSlug
}: ChapterNavigationProps) {
  const { previousChapter, nextChapter } = getAdjacentChapters(bookId, currentSlug);

  return (
    <nav className="chapter-nav" aria-label="ניווט בין פרקים">
      {nextChapter ? (
        <Link
          href={`/book/${bookId}/${nextChapter.slug}`}
          className="chapter-nav-link"
        >
          <span className="chapter-nav-label">הפרק הבא</span>
          <span>{nextChapter.title}</span>
        </Link>
      ) : (
        <span className="chapter-nav-link is-empty" aria-hidden="true" />
      )}

      {previousChapter ? (
        <Link
          href={`/book/${bookId}/${previousChapter.slug}`}
          className="chapter-nav-link"
        >
          <span className="chapter-nav-label">הפרק הקודם</span>
          <span>{previousChapter.title}</span>
        </Link>
      ) : (
        <span className="chapter-nav-link is-empty" aria-hidden="true" />
      )}
    </nav>
  );
}
