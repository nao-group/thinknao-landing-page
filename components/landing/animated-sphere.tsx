"use client";

import { useEffect, useRef } from "react";

// ── Refined China border (lon, lat) ──────────────────────────────────────────
// More accurate outline capturing: NW Xinjiang, SW Tibet corridor,
// south coast concavity, Manchuria northeast bump
const CHINA_POLY: [number, number][] = [
  // West Xinjiang – north edge
  [73.5, 49.2],
  [76.5, 49.8],
  [80.5, 50.3],
  [84.0, 49.2],
  [87.5, 49.2],
  [90.0, 49.5],
  [93.0, 49.4],
  [96.5, 49.9],
  [100.0, 50.4],
  // Inner Mongolia
  [104.0, 50.2],
  [108.5, 50.0],
  [112.0, 49.5],
  [115.5, 49.8],
  [118.5, 49.5],
  // NE Manchuria – the distinctive northward bump
  [120.0, 52.0],
  [122.5, 53.3],
  [126.0, 53.5],
  [129.5, 53.1],
  [133.5, 52.7],
  // Far NE corner, then south
  [134.8, 50.0],
  [134.0, 48.0],
  [132.0, 46.5],
  [131.0, 45.5],
  // Manchuria east coast down
  [129.0, 44.0],
  [126.5, 43.5],
  [124.5, 42.8],
  [123.0, 41.8],
  // Liaoning coast
  [122.0, 41.0],
  [122.5, 40.2],
  [122.0, 39.5],
  // Bohai Gulf indentation
  [120.5, 38.5],
  [120.0, 37.0],
  // Shandong Peninsula
  [122.5, 37.2],
  [122.0, 36.0],
  // East coast south
  [121.5, 33.0],
  [121.8, 30.5],
  [122.5, 29.8],
  // Zhejiang / Fujian coast
  [121.5, 27.5],
  [120.0, 26.5],
  [119.0, 26.0],
  [117.5, 24.5],
  // South coast – concave Gulf of Guangdong
  [115.0, 23.0],
  [113.5, 22.5],
  [113.0, 22.8],
  [111.5, 21.5],
  [110.0, 20.5],
  // Gulf of Tonkin
  [108.5, 21.5],
  [107.5, 22.0],
  [106.5, 22.3],
  [104.5, 22.5],
  [102.5, 22.7],
  [100.0, 22.6],
  // Yunnan SW
  [97.5, 23.5],
  [97.0, 26.0],
  // Myanmar / Yunnan border
  [98.5, 27.5],
  [97.0, 28.5],
  // Tibet south edge
  [92.5, 27.5],
  [90.0, 28.0],
  [88.5, 27.7],
  [85.0, 28.3],
  [83.0, 28.2],
  [80.5, 30.0],
  // Xinjiang SW – narrow Pamir corridor
  [77.0, 32.5],
  [74.5, 35.5],
  [75.0, 37.5],
  [76.0, 38.5],
  [77.5, 40.5],
  [79.5, 42.0],
  [80.5, 43.5],
  [79.5, 45.5],
  [76.0, 47.0],
  [73.5, 49.2],  // back to start
];

// Small islands
const HAINAN: [number, number][] = [
  [108.7, 20.1], [110.0, 19.9], [111.0, 19.3],
  [111.2, 18.8], [110.5, 18.3], [109.5, 18.2],
  [108.7, 18.8], [108.4, 19.5], [108.7, 20.1],
];
const TAIWAN: [number, number][] = [
  [121.0, 25.3], [121.8, 25.0], [122.0, 24.0],
  [121.5, 22.5], [120.8, 22.2], [120.2, 22.8],
  [120.0, 23.8], [120.3, 24.7], [121.0, 25.3],
];

const LON_MIN = 73, LON_MAX = 135.5;
const LAT_MIN = 18, LAT_MAX = 54;

function toNorm(lon: number, lat: number): [number, number] {
  return [
    (lon - LON_MIN) / (LON_MAX - LON_MIN),
    (LAT_MAX - lat) / (LAT_MAX - LAT_MIN),
  ];
}

function buildGrid(gw: number, gh: number): boolean[][] {
  const off = document.createElement("canvas");
  off.width = gw; off.height = gh;
  const oc = off.getContext("2d")!;

  const fill = (poly: [number, number][]) => {
    oc.beginPath();
    poly.forEach(([lon, lat], i) => {
      const [nx, ny] = toNorm(lon, lat);
      if (i === 0) oc.moveTo(nx * gw, ny * gh);
      else oc.lineTo(nx * gw, ny * gh);
    });
    oc.closePath();
    oc.fill();
  };

  oc.fillStyle = "#fff";
  fill(CHINA_POLY);
  fill(HAINAN);
  fill(TAIWAN);

  const d = oc.getImageData(0, 0, gw, gh).data;
  return Array.from({ length: gh }, (_, y) =>
    Array.from({ length: gw }, (_, x) => d[(y * gw + x) * 4] > 100)
  );
}

// ── colours ───────────────────────────────────────────────────────────────────
const C_REST  = { r: 160, g: 104, b:   8 }; // dim resting pixel
const C_BASE  = { r: 212, g: 160, b:  23 }; // #D4A017 — base lit
const C_SCAN  = { r: 255, g: 215, b:  60 }; // scanline highlight

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GW = 62, GH = 43;
    const grid = buildGrid(GW, GH);

    const cells: { gx: number; gy: number; birthFrame: number }[] = [];
    for (let gy = 0; gy < GH; gy++)
      for (let gx = 0; gx < GW; gx++)
        if (grid[gy]?.[gx])
          cells.push({
            gx, gy,
            birthFrame: Math.floor(Math.random() * 60),
          });

    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const SCAN_PERIOD = 260; // frames per sweep

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cw = rect.width;
      const ch = rect.height;

      const px = Math.floor(Math.min((cw * 0.82) / GW, (ch * 0.82) / GH));
      const mapW = GW * px;
      const mapH = GH * px;
      const ox   = Math.floor((cw - mapW) / 2);
      const oy   = Math.floor((ch - mapH) / 2);

      // Scanline: 0..GW, loops every SCAN_PERIOD frames
      const scanCol = ((frame % SCAN_PERIOD) / SCAN_PERIOD) * GW;

      for (const { gx, gy, birthFrame } of cells) {
        if (frame < birthFrame) continue;

        const fadeIn = Math.min(1, (frame - birthFrame) / 30);

        // Scanline glow
        const scanDist = Math.abs(gx - scanCol);
        const scanGlow = Math.max(0, 1 - scanDist / 2.5);

        let cr: number, cg: number, cb: number, alpha: number;
        if (scanGlow > 0.01) {
          cr = lerp(C_BASE.r, C_SCAN.r, scanGlow);
          cg = lerp(C_BASE.g, C_SCAN.g, scanGlow);
          cb = lerp(C_BASE.b, C_SCAN.b, scanGlow);
          alpha = fadeIn * (0.75 + scanGlow * 0.2);
        } else {
          cr = lerp(C_REST.r, C_BASE.r, 0.45);
          cg = lerp(C_REST.g, C_BASE.g, 0.45);
          cb = lerp(C_REST.b, C_BASE.b, 0.45);
          alpha = fadeIn * 0.55;
        }

        ctx.fillStyle = `rgba(${Math.round(cr)},${Math.round(cg)},${Math.round(cb)},${alpha.toFixed(2)})`;
        ctx.fillRect(ox + gx * px + 1, oy + gy * px + 1, px - 1, px - 1);
      }

      // Faint grid lines
      ctx.strokeStyle = "rgba(212,160,23,0.05)";
      ctx.lineWidth   = 0.5;
      for (let gx = 0; gx <= GW; gx++) {
        ctx.beginPath();
        ctx.moveTo(ox + gx * px, oy);
        ctx.lineTo(ox + gx * px, oy + mapH);
        ctx.stroke();
      }
      for (let gy = 0; gy <= GH; gy++) {
        ctx.beginPath();
        ctx.moveTo(ox, oy + gy * px);
        ctx.lineTo(ox + mapW, oy + gy * px);
        ctx.stroke();
      }

      frame++;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
