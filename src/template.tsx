import type { PropsWithChildren } from "react";

export interface Frontmatter {
  title: string;
}

export default function Template({
  frontmatter,
  children,
}: PropsWithChildren<{ frontmatter: Frontmatter }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{frontmatter.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
