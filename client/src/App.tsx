import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { HumanCheckHost } from "@/lib/humanCheck";
import { metaFor } from "@/seo";
import Home from "@/pages/Home";
import { TripsPage, TripPage } from "@/pages/Trips";
import { PlacesPage, PlacePage } from "@/pages/Places";
import { JournalPage, PostPage } from "@/pages/Journal";
import { AboutPage, ContactPage, FaqPage } from "@/pages/Info";
import { PrivacyPage, TermsPage, CancellationPage, CookiesPage } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";

/** Keeps <title> and the description in sync on client-side navigation (the prerender writes the first one). */
function HeadSync() {
  const [path] = useLocation();
  useEffect(() => {
    const m = metaFor(path);
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.description);
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [path]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <HeadSync />
      <HumanCheckHost />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/packages" component={TripsPage} />
        <Route path="/packages/:slug">{(p) => <TripPage slug={p.slug} />}</Route>
        <Route path="/destinations" component={PlacesPage} />
        <Route path="/destinations/:slug">{(p) => <PlacePage slug={p.slug} />}</Route>
        <Route path="/journal" component={JournalPage} />
        <Route path="/journal/:slug">{(p) => <PostPage slug={p.slug} />}</Route>
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cancellation-policy" component={CancellationPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
