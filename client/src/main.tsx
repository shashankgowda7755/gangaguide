import { createRoot } from "react-dom/client";
import App from "./App";
// Self-hosted fonts (no Google Fonts CDN)
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource/crimson-text/400.css";
import "@fontsource/crimson-text/600.css";
import "@fontsource/crimson-text/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
