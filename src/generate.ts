import { dirname } from "path";
import render, { type PageModule } from "./render";
import fs from "fs/promises";

const pages = import.meta.glob<PageModule>("./pages/**/*.mdx", {
  eager: true,
});

Promise.all(
  Object.entries(pages).map(async ([specifier, page]) => {
    const html = await render(page);
    const path = specifier
      .replace("./pages", "dist")
      .replace(/\.mdx$/, ".html");
    const dir = dirname(path);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path, html, "utf-8");
  }),
);
