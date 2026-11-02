import { useState } from "react";
import { Link } from "wouter";
import { ghats } from "@/content/places";
import { tripBySlug } from "@/content/trips";

/*
 * Hand-built schematic of the Varanasi riverfront, north at the top: Assi (south) to Raj Ghat (north).
 * Not to scale. The ordered list under the SVG carries the same content for keyboards and screen readers,
 * so the drawing itself is decorative (aria-hidden) and only mouse-clickable.
 */

const W = 420;
const TOP = 60;
const BOTTOM = 710;
const bankX = (y: number) => 255 - 75 * Math.sin((Math.PI * (y - TOP)) / (BOTTOM - TOP));
const RIVER = 115;

const ys = [690, 640, 580, 525, 430, 372, 330, 245, 95];

function bankPath(offset = 0) {
  const pts: string[] = [];
  for (let y = TOP - 40; y <= BOTTOM + 40; y += 10) pts.push(`${(bankX(y) + offset).toFixed(1)},${y}`);
  return "M" + pts.join(" L");
}

const water = (() => {
  const left: string[] = [];
  const right: string[] = [];
  for (let y = TOP - 40; y <= BOTTOM + 40; y += 10) {
    left.push(`${bankX(y).toFixed(1)},${y}`);
    right.unshift(`${(bankX(y) + RIVER).toFixed(1)},${y}`);
  }
  return "M" + left.join(" L") + " L" + right.join(" L") + " Z";
})();

const east = (() => {
  const pts: string[] = [];
  for (let y = TOP - 40; y <= BOTTOM + 40; y += 10) pts.push(`${(bankX(y) + RIVER).toFixed(1)},${y}`);
  return `M${pts.join(" L")} L${W},${BOTTOM + 40} L${W},${TOP - 40} Z`;
})();

export function GhatMap() {
  const [active, setActive] = useState(4);
  return (
    <div className="map">
      <svg className="map__svg" viewBox={`0 0 ${W} 770`} aria-hidden="true" focusable="false">
        <path className="map__east" d={east} />
        <path className="map__water" d={water} />
        <path className="map__bank" d={bankPath()} />
        <path className="map__bank" d={bankPath(RIVER)} />
        <text className="map__flow" transform={`translate(${bankX(400) + RIVER / 2 + 5} 470) rotate(-90)`} textAnchor="middle">
          GANGA FLOWS NORTH ↑
        </text>
        <text className="map__label-east" x={W - 12} y={300} textAnchor="end">
          Sand flats
        </text>
        <text className="map__label-east" x={W - 12} y={318} textAnchor="end">
          (east bank)
        </text>
        <text className="map__label-east" x={W - 12} y={40} textAnchor="end">
          N ↑
        </text>
        {ghats.map((g, i) => {
          const y = ys[i];
          const x = bankX(y);
          return (
            <g
              key={g.name}
              className="map__node"
              data-active={i === active}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setActive(i)}
            >
              <line className="map__tick" x1={x} y1={y} x2={x + 14} y2={y} />
              <circle cx={x} cy={y} r={i === active ? 9 : 7} />
              <text x={x - 16} y={y + 6} textAnchor="end">
                {g.name}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="map__legend" reversed aria-label="Ghats from north to south">
        {[...ghats.keys()].reverse().map((i) => {
          const g = ghats[i];
          const trip = g.trip ? tripBySlug(g.trip) : undefined;
          return (
            <li key={g.name} data-active={i === active}>
              <b>
                <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
                  {g.name} Ghat
                </button>
              </b>
              <span>
                {g.note}
                {trip && (
                  <>
                    {" "}
                    <Link href={`/packages/${trip.slug}`}>{trip.name}</Link>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
