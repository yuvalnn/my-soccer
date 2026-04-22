import type { ChapterHeading } from "@/lib/content";

type ChapterTableOfContentsProps = {
  headings: ChapterHeading[];
};

export function ChapterTableOfContents({
  headings
}: ChapterTableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="chapter-toc" aria-label="תוכן עניינים של הפרק">
      <h2 className="chapter-toc-title">בתוך הפרק</h2>
      <ol className="chapter-toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={[
              "chapter-toc-item",
              heading.level === 3 ? "is-nested" : "",
              heading.level === 4 ? "is-deep" : ""
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <a href={`#${heading.id}`} className="chapter-toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
