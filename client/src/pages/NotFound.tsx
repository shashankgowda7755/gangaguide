import { Link } from "wouter";

export default function NotFound() {
  return (
    <section className="wrap lost">
      <h1>This ghat is not on our map.</h1>
      <p className="lede">The page you asked for does not exist, or it moved when we rebuilt the site.</p>
      <div className="btn-row" style={{ marginTop: "var(--space-5)" }}>
        <Link href="/" className="btn">Back to the home page</Link>
        <Link href="/packages" className="btn btn--ghost">See all trips</Link>
      </div>
    </section>
  );
}
