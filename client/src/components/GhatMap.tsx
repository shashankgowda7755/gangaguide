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
const RIVER = 115;

// Two drawings of the same riverfront: the tall one for wide screens, a condensed one for phones (CSS picks).
type Shape = { top: number; bottom: number; h: number; ys: number[]; flowY: number; sandY: number; northY: number };
const TALL: Shape = { top: 60, bottom: 710, h: 770, ys: [690, 640, 580, 525, 430, 372, 330, 245, 95], flowY: 470, sandY: 300, northY: 40 };
const COMPACT: Shape = { top: 40, bottom: 430, h: 460, ys: [420, 382, 344, 306, 258, 220, 182, 136, 62], flowY: 290, sandY: 190, northY: 26 };

function geometry({ top, bottom }: Shape) {
  const bankX = (y: number) => 255 - 75 * Math.sin((Math.PI * (y - top)) / (bottom - top));
  const ys: number[] = [];
  for (let y = top - 40; y <= bottom + 40; y += 10) ys.push(y);
  const line = (offset: number) => ys.map((y) => `${(bankX(y) + offset).toFixed(1)},${y}`);
  return {
    bankX,
    bank: (offset = 0) => "M" + line(offset).join(" L"),
    water: "M" + line(0).join(" L") + " L" + line(RIVER).reverse().join(" L") + " Z",
    east: `M${line(RIVER).join(" L")} L${W},${bottom + 40} L${W},${top - 40} Z`,
  };
}

function River({ shape, active, onPick, className }: { shape: Shape; active: number; onPick: (i: number) => void; className: string }) {
  const g = geometry(shape);
  return (
    <svg className={`map__svg ${className}`} viewBox={`0 0 ${W} ${shape.h}`} aria-hidden="true" focusable="false">
      <path className="map__east" d={g.east} />
      <path className="map__water" d={g.water} />
      <path className="map__bank" d={g.bank()} />
      <path className="map__bank" d={g.bank(RIVER)} />
      <text className="map__flow" transform={`translate(${g.bankX(shape.flowY - 70) + RIVER / 2 + 5} ${shape.flowY}) rotate(-90)`} textAnchor="middle">
        GANGA FLOWS NORTH ↑
      </text>
      <text className="map__label-east" x={W - 12} y={shape.sandY} textAnchor="end">
        Sand flats
      </text>
      <text className="map__label-east" x={W - 12} y={shape.sandY + 18} textAnchor="end">
        (east bank)
      </text>
      <text className="map__label-east" x={W - 12} y={shape.northY} textAnchor="end">
        N ↑
      </text>
      {ghats.map((gh, i) => {
        const y = shape.ys[i];
        const x = g.bankX(y);
        return (
          <g key={gh.name} className="map__node" data-active={i === active} style={{ "--i": i } as React.CSSProperties} onClick={() => onPick(i)}>
            <line className="map__tick" x1={x} y1={y} x2={x + 14} y2={y} />
            <circle cx={x} cy={y} r={i === active ? 9 : 7} />
            <text x={x - 16} y={y + 6} textAnchor="end">
              {gh.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GhatMap() {
  const [active, setActive] = useState(4);
  return (
    <div className="map">
      <River shape={TALL} active={active} onPick={setActive} className="map__svg--tall" />
      <River shape={COMPACT} active={active} onPick={setActive} className="map__svg--compact" />
      <ol className="map__legend" reversed aria-label="Ghats from north to south">
        {[...ghats.keys()].reverse().map((i) => {
          const g = ghats[i];
          const trip = g.trip ? tripBySlug(g.trip) : undefined;
          return (
            <li key={g.name} data-active={i === active}>
              <b>
                <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
                  {g.name.endsWith("Ghat") ? g.name : `${g.name} Ghat`}
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
