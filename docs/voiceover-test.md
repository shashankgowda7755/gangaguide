# VoiceOver test script — GangaGuides (manual, ~15 minutes)

Why this exists: on 2026-11-02 the screen-reader pass was done with an automated proxy
(`scripts/a11y-audit.mjs`: accessibility tree, computed names, Tab order, focus moves, menu, form
error and success). **Real VoiceOver was not run** (the build agent cannot drive macOS VoiceOver).
These 10 steps close that gap. Note anything that sounds wrong in `docs/memory.md`.

Setup: Mac + Safari, site running (`npm run preview` → http://127.0.0.1:4870, or the live URL).
Turn VoiceOver on/off with **Cmd + F5**. "VO" = **Ctrl + Option**. Clear the cookie notice first.

| # | Do | You should hear |
|---|---|---|
| 1 | Open `/`. Press **Tab** once. | "Skip to content, link". Press Enter: focus jumps to the main content. |
| 2 | **VO + U**, choose *Headings* with the arrow keys. | One level-1 heading ("Varanasi, read from the river."), then level 2: Ways to see it, A day on the river, Beyond Kashi, Before you ask, Tell us your dates. |
| 3 | In the rotor, choose *Landmarks*. | banner, main, complementary "Quick contact", content information; regions named after each section. |
| 4 | Tab to the ghat list under the map (after "See trips and prices"). | List label "Ghats from north to south. Choosing a ghat marks it on the drawing." Each item is a toggle button ("Raj Ghat, toggle button, not selected"); Dashashwamedh is selected. The drawing itself is silent (decorative). |
| 5 | Keep tabbing to "Beyond Kashi". | Each card reads the place name first, then the distance: "Sarnath सारनाथ, About 10 km from Varanasi, …". Hindi names should be read in a Hindi voice (they carry `lang="hi"`). |
| 6 | Resize Safari narrow (or use an iPhone with VoiceOver). Tab to "Menu". Press Space. | "Menu, button, collapsed" → after Space "Close, button, expanded". Tab cycles only through the menu links and back to Close. **Esc** closes and returns to "Menu". |
| 7 | Open `/destinations/varanasi`. VO + Right Arrow through the page. | Breadcrumb navigation, the H1 "Varanasi वाराणसी", "What to see" list, "Trips that go here" complementary area. Placeholder photos say "Photo placeholder: …" (expected until real photos arrive). |
| 8 | Open `/packages/kashi-darshan-one-day`. Tab to the price box. | "Price and booking" complementary; the cancellation policy link; "Ask on WhatsApp, opens WhatsApp in a new tab"; then the enquiry form with the trip already selected. |
| 9 | Open `/contact`. Without filling anything, Tab to "Send enquiry" and press Space. | Focus lands on "Your name", which is announced as invalid with "Please enter your name." Tab: "Phone or WhatsApp", invalid, with its message. Consent checkbox also invalid. |
| 10 | Fill name, phone, tick consent, send. (Use a test name; the lead is saved locally.) | Focus moves to the confirmation: "Thank you, … We have your enquiry. Reference GG-…", then the three next steps and "Continue on WhatsApp, opens in a new tab". If the server is down you hear instead "Your enquiry was not sent…" with a WhatsApp fallback. |

Pass = every row sounds as described, nothing is read twice in a confusing way, and no focus lands
on something invisible. Log the result (date, macOS/Safari version, any problems) in `docs/memory.md`.
