# GangaGuides

Website for local guides in Varanasi, Sarnath, Ayodhya and Prayagraj. Docs for humans and AI: `docs/`.

```bash
npm ci
npm run dev                                         # http://127.0.0.1:4870 (Vite, client-rendered)
PREVIEW_URL=http://127.0.0.1:4870 npm run build     # prerendered static site in dist/public
npm start                                           # serves dist/public + /api on :4870
npm run check                                       # TypeScript
node scripts/qa.mjs                                 # Playwright + axe on every page (needs a running preview)
```

Business facts and open questions: `client/src/site.config.ts` (`TODO(ask)`). Photos: `ASSETS-NEEDED.md`.
Deploy: Vercel via `vercel.json` (push = PR; merge/deploy only with the owner's go).
