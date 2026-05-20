"use client";
import { useEffect, useRef } from "react";

const LOCATIONS = [
  { city: "Beirut",    lat: 33.8938, lng: 35.5018, side: "right" },
  { city: "Dubai",     lat: 25.2048, lng: 55.2708, side: "right" },
  { city: "Abu Dhabi", lat: 24.4539, lng: 54.3773, side: "right" },
  { city: "Doha",      lat: 25.2854, lng: 51.5310, side: "left"  },
  { city: "Riyadh",    lat: 24.7136, lng: 46.6753, side: "left"  },
  { city: "Jeddah",    lat: 21.4858, lng: 39.1925, side: "left"  },
  { city: "Dammam",    lat: 26.4207, lng: 50.0888, side: "right" },
  { city: "AlUla",     lat: 26.6125, lng: 37.9194, side: "left"  },
  { city: "NEOM",      lat: 27.9654, lng: 35.2260, side: "left"  },
];

const MENA_IDS = new Set([
  422, 760, 400, 368, 275, 376,
  682, 784, 634, 414, 48, 512, 887,
  818, 364, 792, 196,
]);

const MAP_STYLES = `
  .ranna-dot {
    position: absolute;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #D400AA;
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 0 2px rgba(212,0,170,.22),
      0 0 10px 5px rgba(212,0,170,.5),
      0 0 22px 10px rgba(212,0,170,.18);
    animation: rannaDotPulse 3.2s ease-in-out infinite;
  }
  @keyframes rannaDotPulse {
    0%, 100% {
      box-shadow:
        0 0 0 2px rgba(212,0,170,.22),
        0 0 10px 5px rgba(212,0,170,.5),
        0 0 22px 10px rgba(212,0,170,.18);
    }
    50% {
      box-shadow:
        0 0 0 3px rgba(212,0,170,.15),
        0 0 14px 8px rgba(212,0,170,.7),
        0 0 32px 16px rgba(212,0,170,.25);
    }
  }
  .ranna-label {
    position: absolute;
    white-space: nowrap;
    font-size: 10px;
    font-weight: 300;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.65);
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
  }
  .ranna-label.right { left: 11px; }
  .ranna-label.left  { right: 11px; }
  .leaflet-container { background: #080A1C !important; }
`;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onReady?: (map: any) => void;
}

export default function RegionalMap({ onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    // Inject CSS once
    if (!document.getElementById("ranna-map-styles")) {
      const style = document.createElement("style");
      style.id = "ranna-map-styles";
      style.textContent = MAP_STYLES;
      document.head.appendChild(style);
    }
    if (!document.querySelector('link[href*="leaflet.min.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    const container = containerRef.current;

    Promise.all([
      import("leaflet"),
      import("topojson-client"),
      fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json()),
    ]).then(([L, topojson, topo]) => {
      if (!container || mapInstanceRef.current) return;

      const map = L.map(container, {
        center: [26, 43],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
      });
      mapInstanceRef.current = map;
      onReady?.(map);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const countries = topojson.feature(topo as any, (topo as any).objects.countries);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      L.geoJSON(countries as any, {
        interactive: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style: (f: any) => {
          const id = parseInt(f?.id ?? "0", 10);
          const mena = MENA_IDS.has(id);
          return {
            fillColor:   mena ? "#16103A" : "#09091E",
            fillOpacity: 1,
            color:       mena ? "rgba(160,100,255,0.32)" : "rgba(80,60,160,0.12)",
            weight:      mena ? 0.9 : 0.4,
          };
        },
      }).addTo(map);

      LOCATIONS.forEach((loc, i) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="position:relative;width:0;height:0">
            <div class="ranna-dot" style="animation-delay:${(i * 0.38).toFixed(2)}s"></div>
            <div class="ranna-label ${loc.side}">${loc.city}</div>
          </div>`,
          iconSize:   [0, 0],
          iconAnchor: [0, 0],
        });
        L.marker([loc.lat, loc.lng], { icon, interactive: false }).addTo(map);
      });

      const bounds = L.latLngBounds(LOCATIONS.map(l => [l.lat, l.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [72, 100] });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", background: "#080A1C" }} />
  );
}
