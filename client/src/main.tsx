import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { captureUtm } from "./lib/utm";
import "./styles/site.css";

captureUtm();
const el = document.getElementById("root")!;
if (el.hasChildNodes()) hydrateRoot(el, <App />);
else createRoot(el).render(<App />);
