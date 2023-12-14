import { globby } from "globby";
import type { Plugin } from "vite";

export default async function assets(): Promise<Plugin> {
  const pages = await globby("src/pages/**/*.mdx", { absolute: true });

  return {
    name: "pages:assets",
    apply(_, env) {
      return env.command === "build" && !env.isSsrBuild;
    },

    config(config) {
      config ??= {};
      config.build ??= {};
      config.build.rollupOptions ??= {};
      Object.assign(config.build.rollupOptions, { input: pages });
    },

    generateBundle(_, bundle) {
      for (const id in bundle) {
        if (bundle[id]!.type === "chunk") {
          delete bundle[id];
        }
      }
    },
  };
}
