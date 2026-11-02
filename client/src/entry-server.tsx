import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { metaFor, headHtml, staticPaths } from "./seo";
import { openTodos } from "./site.config";

export function render(path: string) {
  const html = renderToString(
    <Router ssrPath={path}>
      <App />
    </Router>,
  );
  const meta = metaFor(path);
  return { html, head: headHtml(path, meta), status: meta.status ?? 200 };
}

export { staticPaths, openTodos };
