import type { Plugin } from "vite";

const ignore = ["node_modules", "@vite", "@react-refresh"];

export default function server(): Plugin {
  return {
    name: "pages:server",

    async configureServer(server) {
      const { default: render } = await server.ssrLoadModule("/src/render.tsx");

      server.middlewares.use(async (req, res, next) => {
        try {
          if (!req.url) return next();
          const { pathname } = new URL(req.url, `http://${req.headers.host}`);
          if (ignore.some((i) => pathname.startsWith(`/${i}`))) return next();

          const url = pathname.endsWith("/")
            ? `/src/pages${pathname}index.mdx`
            : `/src/pages${pathname}.mdx`;

          const module = await server.ssrLoadModule(url);
          const rendered = await render(module);
          const transformed = await server.transformIndexHtml(
            req.url,
            rendered,
          );
          res.setHeader("Content-Type", "text/html").end(transformed);
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    },
  };
}
