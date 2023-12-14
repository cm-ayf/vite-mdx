import ReactDOMServer from "react-dom/server";
import type { JSX } from "react";
import Template, { type Frontmatter } from "./template";

export interface PageModule {
  default: () => JSX.Element;
  frontmatter: Frontmatter;
}

export default async function render({
  default: MDXContent,
  frontmatter,
}: PageModule) {
  return ReactDOMServer.renderToString(
    <Template frontmatter={frontmatter}>
      <MDXContent />
    </Template>,
  );
}
