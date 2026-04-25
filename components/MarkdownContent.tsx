import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { type ChapterHeading } from "@/lib/content";

type MarkdownContentProps = {
  content: string;
  headings: ChapterHeading[];
};

function getHeadingId(
  headingText: string,
  headings: ChapterHeading[],
  fallback: string
) {
  return headings.find((heading) => heading.text === headingText)?.id ?? fallback;
}

function getNodeText(children: ReactNode) {
  return Array.isArray(children)
    ? children.map((child) => String(child)).join("").trim()
    : String(children).trim();
}

function withBasePath(url: string) {
  if (!url.startsWith("/")) {
    return url;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${url}`;
}

export function MarkdownContent({ content, headings }: MarkdownContentProps) {
  return (
    <div className="prose">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="content-h1" dir="auto">
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text, headings, text);

            return (
              <h2 id={id} dir="auto">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text, headings, text);

            return (
              <h3 id={id} dir="auto">
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const text = getNodeText(children);
            const id = getHeadingId(text, headings, text);

            return (
              <h4 id={id} dir="auto">
                {children}
              </h4>
            );
          },
          a: ({ href, children }) => (
            <a href={href} dir="auto">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote dir="auto">{children}</blockquote>
          ),
          p: ({ children }) => <p dir="auto">{children}</p>,
          ul: ({ children }) => <ul dir="rtl">{children}</ul>,
          ol: ({ children }) => <ol dir="rtl">{children}</ol>,
          li: ({ children }) => <li dir="rtl">{children}</li>,
          code: ({ children }) => (
            <code dir="ltr" className="inline-ltr">
              {children}
            </code>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") {
              return null;
            }

            return (
              <figure>
                <img src={withBasePath(src)} alt={alt ?? ""} />
                {alt ? <figcaption>{alt}</figcaption> : null}
              </figure>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
