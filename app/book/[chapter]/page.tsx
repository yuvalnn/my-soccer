import { notFound } from "next/navigation";
import { getChapterBySlug, getChapters } from "@/lib/content";
import { ChapterNavigation } from "@/components/ChapterNavigation";
import { ChapterTableOfContents } from "@/components/ChapterTableOfContents";
import { MarkdownContent } from "@/components/MarkdownContent";

type ChapterPageProps = {
  params: Promise<{
    chapter: string;
  }>;
};

export function generateStaticParams() {
  return getChapters().map((chapter) => ({
    chapter: chapter.slug
  }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = getChapterBySlug(chapterSlug);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="shell">
      <article className="card article-card">
        <header className="article-header">
          <p className="eyebrow">פרק {chapter.order}</p>
          <h1>{chapter.title}</h1>
          <p className="lead">{chapter.summary}</p>
        </header>

        <ChapterTableOfContents headings={chapter.headings} />

        <MarkdownContent content={chapter.content} headings={chapter.headings} />

        <ChapterNavigation currentSlug={chapter.slug} />
      </article>
    </main>
  );
}
