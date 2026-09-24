import type { ShikiTransformer } from "shiki";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { LRUCache } from "lru-cache";
import { createHash } from "node:crypto";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki";

type HighlightedHast = Awaited<ReturnType<typeof codeToHast>>;

const highlightCache = new LRUCache<string, HighlightedHast>({
  max: 500,
  ttl: 1000 * 60 * 60,
});

const componentHighlightTransformers = [
  {
    code(node) {
      node.properties["data-line-numbers"] = "";
    },
    line(node) {
      node.properties["data-line"] = "";
    },
    pre(node) {
      node.properties.class =
        "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent";
    },
  },
] satisfies ShikiTransformer[];

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties.__raw__ = raw;

        if (raw.startsWith("npm install")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm install", "yarn add");
          node.properties.__pnpm__ = raw.replace("npm install", "pnpm add");
          node.properties.__bun__ = raw.replace("npm install", "bun add");
        } else if (raw.startsWith("npx create-")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx create-", "yarn create ");
          node.properties.__pnpm__ = raw.replace("npx create-", "pnpm create ");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm create")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm create", "yarn create");
          node.properties.__pnpm__ = raw.replace("npm create", "pnpm create");
          node.properties.__bun__ = raw.replace("npm create", "bun create");
        } else if (raw.startsWith("npx")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npx", "yarn dlx");
          node.properties.__pnpm__ = raw.replace("npx", "pnpm dlx");
          node.properties.__bun__ = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm run")) {
          node.properties.__npm__ = raw;
          node.properties.__yarn__ = raw.replace("npm run", "yarn");
          node.properties.__pnpm__ = raw.replace("npm run", "pnpm");
          node.properties.__bun__ = raw.replace("npm run", "bun");
        }
      }
    },
  },
] as ShikiTransformer[];

const getHighlightedHast = async (code: string, language: string) => {
  const cacheKey = createHash("sha256")
    .update(`${language}:${code}`)
    .digest("hex");

  const cached = highlightCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const hast = await codeToHast(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: componentHighlightTransformers,
  });

  highlightCache.set(cacheKey, hast);

  return hast;
};

export const highlightCode = async (code: string, language = "tsx") => {
  const hast = await getHighlightedHast(code, language);

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    passKeys: true,
    passNode: true,
  });
};
