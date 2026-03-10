import { useState, useRef, useEffect } from "react";
import { ShieldCheck, Fingerprint, Zap, Building2, UserCheck, Clock, Eye, AlertTriangle, Check, X, Minus, ArrowRight, Globe, Lock, Database, ArrowUpRight } from "lucide-react";

const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --obsidian: #09090B;
    --charcoal: #111113;
    --charcoal-2: #18181C;
    --charcoal-3: #1E1E24;
    --indigo: #4F46E5;
    --indigo-dim: rgba(79,70,229,0.14);
    --indigo-glow: rgba(79,70,229,0.35);
    --silver: #D4D8E2;
    --white: #ffffff;
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.07);
    --glass-border-strong: rgba(255,255,255,0.11);
    --muted: rgba(212,216,226,0.42);
    --muted-2: rgba(212,216,226,0.25);
    --red-soft: rgba(239,68,68,0.12);
    --red: #EF4444;
    --green: #22C55E;
    --amber: #F59E0B;
    --amber-soft: rgba(245,158,11,0.1);
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-xl: 26px;
    --radius-2xl: 34px;
    --font-hero: 'Gutagert', sans-serif;
    --font-display: 'Gutagert', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  #root {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  body {
    background: var(--obsidian);
    color: var(--silver);
    font-family: var(--font-display);
    font-size: 15px;
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: ${noiseSVG};
    background-repeat: repeat;
    background-size: 200px;
    pointer-events: none;
    z-index: 9999;
  }

  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: 60px;
    background: rgba(9,9,11,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
  }
  
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 48px;
  }

  .nav-logo {
    font-family: var(--font-hero);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--indigo);
    box-shadow: 0 0 10px var(--indigo-glow);
    animation: blink 2.5s ease-in-out infinite;
  }

  @keyframes blink {
    0%,100% { opacity:1; box-shadow: 0 0 10px var(--indigo-glow); }
    50% { opacity:0.5; box-shadow: 0 0 20px var(--indigo-glow); }
  }

  .nav-links {
    display: flex; gap: 32px; list-style: none;
    font-size: 13px; font-weight: 400; color: var(--muted);
  }

  .nav-links a { color: inherit; text-decoration: none; transition: color .2s; }
  .nav-links a:hover { color: var(--white); }

  .nav-pill {
    padding: 6px 16px;
    border-radius: 999px;
    background: var(--indigo-dim);
    border: 1px solid rgba(79,70,229,0.3);
    color: #818CF8;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .container { width: 100%; max-width: 1480px; margin: 0 auto; padding: 0 48px; }
  section { position: relative; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 0 80px;
    position: relative;
    overflow: hidden;
  }

  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent);
  }

  .hero-glow-l {
    position: absolute; top: -180px; left: -80px;
    width: 640px; height: 640px;
    background: radial-gradient(ellipse, rgba(79,70,229,0.1) 0%, transparent 65%);
    pointer-events: none;
  }

  .hero-glow-r {
    position: absolute; bottom: -100px; right: -60px;
    width: 500px; height: 500px;
    background: radial-gradient(ellipse, rgba(99,60,240,0.07) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 100px; align-items: center; }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .hero-graphic {
    position: relative;
    height: 540px;
    border-radius: var(--radius-2xl);
    background: var(--charcoal-2);
    border: 1px solid var(--glass-border);
    overflow: hidden;
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.8);
    display: flex;
    flex-direction: column;
    margin-top: -220px;
  }
  
  .mockup-header {
    height: 52px;
    border-bottom: 1px solid var(--glass-border);
    background: var(--charcoal);
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 12px;
  }
  
  .mockup-dots { display: flex; gap: 6px; }
  .mockup-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--glass-border-strong); }
  .mockup-dot.r { background: var(--red); }
  .mockup-dot.y { background: var(--amber); }
  .mockup-dot.g { background: #22C55E; }
  
  .mockup-body {
    flex: 1;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }
  
  .mockup-panel {
    background: var(--obsidian);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 24px;
    position: relative;
    overflow: hidden;
  }
  
  .mockup-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .mockup-title { font-size: 14px; color: var(--white); font-weight: 600; display: flex; align-items: center; gap: 8px;}
  .mockup-tag {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 4px 10px; border-radius: 999px; font-family: var(--font-mono);
  }
  .mockup-tag.verified { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.2); }
  
  .mockup-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .mockup-stat { background: var(--glass); padding: 16px; border-radius: 12px; }
  .mockup-val { font-size: 24px; font-family: var(--font-hero); color: var(--white); }
  .mockup-lbl { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }
  
  .mockup-timeline { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
  .mockup-t-item {
    display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--silver);
    padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px;
  }
  .mockup-t-time { font-family: var(--font-mono); color: var(--muted-2); font-size: 11px; }
  
  .hero-graphic::before {
    content: ''; position: absolute; top: -50%; left: -50%; right: -50%; bottom: -50%;
    background: radial-gradient(circle at 100% 0%, rgba(79,70,229,0.15) 0%, transparent 50%);
    pointer-events: none; z-index: 0;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid var(--glass-border-strong);
    background: var(--glass);
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 32px;
    font-family: var(--font-mono);
  }

  .hero-badge-accent { color: #818CF8; }

  .hero-headline {
    font-family: var(--font-hero);
    font-size: clamp(40px, 4.5vw, 82px);
    font-weight: 800;
    line-height: 0.93;
    letter-spacing: -0.03em;
    color: var(--white);
    margin-bottom: 30px;
    max-width: 860px;
  }

  .hero-hl-ghost {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(255,255,255,0.18);
  }

  .hero-hl-indigo-ghost {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(79,70,229,0.5);
  }

  .hero-sub {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--muted);
    max-width: 460px;
    margin-bottom: 52px;
  }

  /* DUAL CTA — side-by-side */
  .cta-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    width: 100%;
    max-width: 700px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid var(--glass-border-strong);
    background: var(--glass-border);
  }

  .cta-block {
    padding: 28px 26px;
    background: var(--charcoal-2);
    overflow: hidden;
    cursor: pointer;
    transition: background .25s;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0;
  }

  .cta-block.b2b { border-right: 1px solid var(--glass-border-strong); border-bottom: none; }
  .cta-block.b2c { }

  .cta-block::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    opacity: 0;
    transition: opacity .3s;
  }

  .cta-block.b2b::after { background: linear-gradient(90deg, var(--indigo), transparent); }
  .cta-block.b2c::after { background: linear-gradient(90deg, #7C3AED, transparent); }

  .cta-block:hover { background: var(--charcoal-3); }
  .cta-block:hover::after { opacity: 1; }

  .cta-block.b2b:hover { box-shadow: inset 0 0 60px rgba(79,70,229,0.06); }
  .cta-block.b2c:hover { box-shadow: inset 0 0 60px rgba(124,58,237,0.05); }

  .cta-row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .cta-audience {
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-family: var(--font-mono);
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid;
  }

  .cta-audience.b2b {
    color: #818CF8;
    border-color: rgba(129,140,248,0.25);
    background: rgba(79,70,229,0.08);
  }

  .cta-audience.b2c {
    color: #A78BFA;
    border-color: rgba(167,139,250,0.25);
    background: rgba(124,58,237,0.07);
  }

  .cta-ico {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .cta-ico.b2b { background: rgba(79,70,229,0.15); color: #818CF8; }
  .cta-ico.b2c { background: rgba(120,80,255,0.12); color: #A78BFA; }

  .cta-title {
    font-family: var(--font-hero);
    font-size: 22px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 12px;
  }

  .cta-desc {
    font-size: 12.5px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.6;
    flex: 1;
    margin-bottom: 24px;
  }

  .cta-sep {
    display: none;
  }

  .cta-link-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    padding: 9px 16px;
    border-radius: 999px;
    border: 1px solid;
    transition: all .2s;
    align-self: flex-start;
    letter-spacing: 0.02em;
  }

  .cta-block.b2b .cta-link-row {
    color: #818CF8;
    border-color: rgba(129,140,248,0.3);
    background: rgba(79,70,229,0.08);
  }

  .cta-block.b2c .cta-link-row {
    color: #A78BFA;
    border-color: rgba(167,139,250,0.28);
    background: rgba(124,58,237,0.07);
  }

  .cta-block.b2b:hover .cta-link-row {
    background: rgba(79,70,229,0.18);
    border-color: rgba(129,140,248,0.5);
  }

  .cta-block.b2c:hover .cta-link-row {
    background: rgba(124,58,237,0.14);
    border-color: rgba(167,139,250,0.45);
  }

  /* STATS */
  .stats-strip {
    background: var(--charcoal);
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
  }

  .stats-inner { display: grid; grid-template-columns: repeat(4,1fr); }

  .stat-cell {
    padding: 32px 40px;
    border-right: 1px solid var(--glass-border);
  }

  .stat-cell:last-child { border-right: none; }

  .stat-n {
    font-family: var(--font-hero);
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--white);
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-l { font-size: 12px; font-weight: 400; color: var(--muted); }

  /* SECTION HEADERS */
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #818CF8;
    font-family: var(--font-mono);
    margin: 0 0 18px 0;
  }

  .eyebrow::before { content:''; width:20px; height:1px; background:#818CF8; flex-shrink: 0; }

  .sec-headline {
    font-family: var(--font-hero);
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--white);
    line-height: 0.95;
    margin-bottom: 18px;
  }

  .sec-body {
    font-size: 15px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
    max-width: 480px;
  }

  /* PROBLEM */
  .problem-section {
    padding: 120px 0;
    background: var(--charcoal);
    overflow: hidden;
  }

  .problem-section::before {
    content: '';
    position: absolute;
    top: -160px; right: -80px;
    width: 500px; height: 500px;
    background: radial-gradient(ellipse, rgba(239,68,68,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  .problem-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
    margin-top: 60px;
  }

  .cost-list { display: flex; flex-direction: column; gap: 10px; margin-top: 32px; }

  .cost-item {
    background: var(--charcoal-2);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 18px 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: border-color .2s;
  }

  .cost-item:hover { border-color: var(--glass-border-strong); }

  .cost-ico {
    width: 34px; height: 34px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .cost-ico.r { background: var(--red-soft); color: var(--red); }
  .cost-ico.a { background: var(--amber-soft); color: var(--amber); }
  .cost-ico.i { background: var(--indigo-dim); color: #818CF8; }

  .cost-title { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 3px; }
  .cost-text { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.5; }

  .linkedin-col { display: flex; flex-direction: column; gap: 16px; }

  .linkedin-label {
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted-2);
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
  }

  .linkedin-label::before { content:''; width:20px; height:1px; background:var(--muted-2); flex-shrink: 0; }

  .linkedin-frame-wrap {
    border-radius: var(--radius-xl);
    overflow: hidden;
    border: 1px solid rgba(239,68,68,0.18);
    box-shadow: 0 28px 64px rgba(0,0,0,0.5);
    background: var(--charcoal-3);
    position: relative;
  }

  .linkedin-frame-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent);
    z-index: 1;
  }

  .linkedin-caption {
    font-size: 12px;
    font-weight: 300;
    color: var(--muted-2);
    line-height: 1.65;
    border-left: 2px solid rgba(239,68,68,0.3);
    padding-left: 14px;
  }

  .linkedin-caption strong { color: rgba(239,68,68,0.85); font-weight: 500; }

  /* PROTOCOL */
  .protocol-section {
    padding: 120px 0;
    background: var(--obsidian);
    overflow: hidden;
  }

  .layers-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2px;
    margin-top: 60px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--glass-border);
  }

  .layer-card {
    background: var(--charcoal);
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    overflow: hidden;
    transition: background .25s;
  }

  .layer-card:hover { background: var(--charcoal-2); }

  .layer-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--indigo), transparent);
    opacity: 0;
    transition: opacity .3s;
  }

  .layer-card:hover::before { opacity: 1; }

  .layer-n {
    font-family: var(--font-hero);
    font-size: 80px;
    color: rgba(255,255,255,0.035);
    line-height: 1;
    position: absolute;
    top: 12px; right: 20px;
    letter-spacing: 0.02em;
  }

  .layer-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--indigo-dim);
    border: 1px solid rgba(79,70,229,0.22);
    display: flex; align-items: center; justify-content: center;
    color: #818CF8;
  }

  .layer-sub {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #818CF8;
    font-family: var(--font-mono);
  }

  .layer-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.02em;
    margin-top: -8px;
  }

  .layer-body { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.65; }

  .layer-tags { display: flex; flex-wrap: wrap; gap: 6px; }

  .layer-tag {
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--glass);
    border: 1px solid var(--glass-border);
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--muted);
  }

  /* COMPARE — full redesign */
  .compare-section {
    padding: 80px 0;
    background: var(--obsidian);
    overflow: hidden;
  }

  .compare-section::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 600px; height: 400px;
    background: radial-gradient(circle, rgba(79,70,229,0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* The unified table wrapper */
  .ctable-wrap {
    margin-top: 40px;
    border-radius: var(--radius-xl);
    border: 1px solid var(--glass-border);
    overflow: hidden;
    background: rgba(17,17,19,0.5);
    backdrop-filter: blur(10px);
  }

  .ctable { width: 100%; border-collapse: collapse; table-layout: fixed; }

  /* Header row */
  .ctable-thead tr { border-bottom: 2px solid var(--glass-border-strong); }

  .ctable-th-empty {
    width: 25%;
    padding: 0;
    border-right: 1px solid var(--glass-border);
  }

  .ctable-th {
    padding: 0;
    vertical-align: middle;
    border-right: 1px solid var(--glass-border);
    width: 25%;
  }

  .ctable-th:last-child { border-right: none; }

  .th-pad {
    padding: 16px 15px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
  }

  .th-pad.featured {
    background: linear-gradient(180deg, rgba(79,70,229,0.08) 0%, transparent 100%);
    border-top: 2px solid rgba(79,70,229,0.5);
  }

  .th-rec {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    background: var(--indigo);
    color: white;
    font-size: 8px;
    font-family: var(--font-mono);
    letter-spacing: 0.1em;
    padding: 2px 8px;
    border-radius: 999px 999px 0 0;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .th-tier-tag {
    font-size: 9px;
    font-family: var(--font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted-2);
  }

  .th-tier-name {
    font-family: var(--font-hero);
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--white);
    line-height: 1;
    text-transform: none;
  }

  .th-tier-name.feat { color: #A5B4FC; }

  .th-price-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-top: 2px;
  }

  .th-price {
    font-size: 13px;
    font-weight: 600;
    color: var(--silver);
  }

  .th-price-sub {
    font-size: 10px;
    font-family: var(--font-mono);
    color: var(--muted-2);
  }

  /* Body rows */
  .ctable-cat {
    padding: 7px 18px;
    background: rgba(255,255,255,0.015);
    font-size: 8.5px;
    font-family: var(--font-mono);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(212,216,226,0.22);
    border-bottom: 1px solid var(--glass-border);
  }

  .ctable tr td { border-bottom: 1px solid var(--glass-border); }
  .ctable tr:last-child td { border-bottom: none; }

  .ctable-lbl {
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 500;
    color: var(--silver);
    width: 25%;
    border-right: 1px solid var(--glass-border);
    line-height: 1.3;
  }

  .ctable-cell {
    padding: 9px 0;
    text-align: center;
    font-size: 13px;
    border-right: 1px solid var(--glass-border);
  }

  .ctable-cell:last-child { border-right: none; }

  .ctable-cell.feat {
    background: rgba(79,70,229,0.02);
    border-right: 1px solid rgba(79,70,229,0.08);
  }

  /* PRODUCTS */
  .products-section {
    padding: 80px 0;
    background: var(--obsidian);
    border-top: 1px solid var(--glass-border);
  }

  .prod-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2px;
    margin-top: 48px;
    background: var(--glass-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .prod-card {
    background: var(--charcoal);
    padding: 36px 30px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: background .25s;
  }

  .prod-card:hover { background: var(--charcoal-2); }

  .prod-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--indigo-dim);
    border: 1px solid rgba(79,70,229,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #818CF8;
  }

  .prod-name { font-size: 18px; font-weight: 700; color: var(--white); letter-spacing: -0.02em; }
  .prod-desc { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 1.6; }

  .prod-status {
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .sd { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  .prod-status.live { color: #22C55E; }
  .prod-status.live .sd { animation: blink 2s ease-in-out infinite; box-shadow: 0 0 5px currentColor; }
  .prod-status.soon { color: var(--amber); }

  /* STATUS */
  .status-section {
    padding: 80px 0;
    background: var(--charcoal);
    border-top: 1px solid var(--glass-border);
    overflow: hidden;
  }

  .beta-wrap {
    background: var(--charcoal-2);
    border: 1px solid rgba(79,70,229,0.28);
    border-radius: var(--radius-2xl);
    padding: 56px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    position: relative;
    overflow: hidden;
  }

  .beta-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(130deg, rgba(79,70,229,0.07) 0%, transparent 50%);
    pointer-events: none;
  }

  .beta-left { flex: 1; position: relative; z-index: 1; }

  .beta-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border-radius: 999px;
    background: rgba(79,70,229,0.12);
    border: 1px solid rgba(79,70,229,0.28);
    color: #818CF8;
    font-size: 10px;
    font-family: var(--font-mono);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .beta-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--indigo);
    animation: blink 2s ease-in-out infinite;
  }

  .beta-headline {
    font-family: var(--font-hero);
    font-size: 44px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--white);
    line-height: 0.95;
    margin-bottom: 10px;
  }

  .beta-sub { font-size: 14px; font-weight: 300; color: var(--muted); max-width: 360px; }

  .beta-right { flex-shrink: 0; position: relative; z-index: 1; min-width: 340px; }

  .email-form {
    display: flex;
    border: 1px solid var(--glass-border-strong);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--charcoal);
    transition: border-color .2s, box-shadow .2s;
  }

  .email-form:focus-within {
    border-color: rgba(79,70,229,0.5);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.08);
  }

  .email-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 15px 18px;
    font-family: var(--font-display);
    font-size: 14px;
    color: var(--white);
  }

  .email-input::placeholder { color: rgba(212,216,226,0.2); }

  .email-btn {
    background: var(--indigo);
    border: none;
    padding: 15px 22px;
    color: white;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: background .2s;
    white-space: nowrap;
  }

  .email-btn:hover { background: #4338CA; }

  .email-hint {
    margin-top: 10px;
    font-size: 11px;
    color: var(--muted-2);
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
  }

  footer {
    padding: 48px 0 36px;
    border-top: 1px solid var(--glass-border);
    background: var(--obsidian);
  }

  .footer-inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; }

  .footer-logo {
    font-family: var(--font-hero);
    font-size: 20px;
    letter-spacing: 0.1em;
    color: var(--white);
  }

  .footer-copy { font-size: 12px; color: var(--muted-2); margin-top: 4px; }

  .footer-links { display: flex; gap: 28px; list-style: none; }
  .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; transition: color .2s; }
  .footer-links a:hover { color: var(--white); }

  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1);
  }

  .reveal.visible { opacity: 1; transform: none; }
  .reveal.d1 { transition-delay: .1s; }
  .reveal.d2 { transition-delay: .2s; }
  .reveal.d3 { transition-delay: .3s; }

  @media (max-width: 960px) {
    nav { padding: 0 24px; }
    .nav-links { display: none; }
    .container { padding: 0 24px; }
    .hero-headline { font-size: 80px; }
    .cta-pair { max-width: 100%; }
    .stats-inner { grid-template-columns: repeat(2,1fr); }
    .stat-cell:nth-child(2) { border-right: none; }
    .stat-cell:nth-child(3) { border-top: 1px solid var(--glass-border); }
    .stat-cell:nth-child(4) { border-top: 1px solid var(--glass-border); border-right: none; }
    .problem-layout { grid-template-columns: 1fr; gap: 48px; }
    .layers-grid { grid-template-columns: 1fr; }
    .prod-grid { grid-template-columns: 1fr; }
    .beta-wrap { flex-direction: column; padding: 36px 28px; }
    .beta-right { min-width: 0; width: 100%; }
    .footer-inner { flex-direction: column; text-align: center; }
  }

  @media (max-width: 600px) {
    .hero-headline { font-size: 56px; }
    .cta-pair { grid-template-columns: 1fr; border-radius: var(--radius-lg); }
    .cta-block.b2b { border-right: none; border-bottom: 1px solid var(--glass-border-strong); }
    .sec-headline { font-size: 40px; }
    .beta-headline { font-size: 36px; }
  }
`;

const tableRows = [
  { cat: "Identity & Proof" },
  { lbl: "C2PA Content Credential", c: true, a: true, e: true },
  { lbl: "Human identity via OAuth", c: false, a: true, e: null },
  { lbl: "Verified author badge", c: false, a: true, e: true },
  { cat: "Labor Verification" },
  { lbl: "Activity Score (hours)", c: false, a: true, e: false },
  { lbl: "OS-level session telemetry", c: false, a: true, e: false },
  { lbl: "Input entropy anti-cheat", c: false, a: true, e: false },
  { lbl: "Basic timestamp proof", c: true, a: true, e: true },
  { cat: "Theft Detection" },
  { lbl: "pHash duplicate detection", c: false, a: true, e: false },
  { lbl: "Conflict alert system", c: false, a: true, e: false },
  { lbl: "File DNA registration", c: null, a: true, e: null },
  { cat: "Integrations" },
  { lbl: "Works with Blender / non-Adobe", c: false, a: true, e: null },
  { lbl: "Invoice & billing sync", c: false, a: true, e: false },
  { lbl: "Agency verification API", c: false, a: true, e: false },
  { lbl: "Browser verification overlay", c: null, a: true, e: true },
];

function CI({ v }) {
  if (v === true) return <Check size={14} style={{ color: '#22C55E' }} />;
  if (v === false) return <X size={14} style={{ color: 'rgba(239,68,68,0.4)' }} />;
  return <Minus size={14} style={{ color: 'rgba(212,216,226,0.18)' }} />;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function HeroSection() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal();
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow-l" />
      <div className="hero-glow-r" />
      <div className="container hero-inner">
        <div className="hero-content">
          <div ref={r1} className="reveal">
            <div className="hero-badge">
              <ShieldCheck size={11} style={{ color: '#818CF8' }} />
              <span className="hero-badge-accent">C2PA-native</span>
              <span style={{ color: 'rgba(212,216,226,0.2)', margin: '0 2px' }}>·</span>
              The Universal Verification Layer
            </div>
          </div>

          <h1 ref={r2} className="reveal d1 hero-headline">
            PROVE THE<br />
            <span className="hero-hl-ghost">
              <span className="hero-hl-indigo-ghost">HUMAN</span> LABOR
            </span><br />
            BEHIND THE<br />
            PIXELS.
          </h1>

          <p ref={r3} className="reveal d2 hero-sub">
            In an era of AI saturation, Trustable provides the infrastructure
            to prove who made it, how long it took, and that it's genuinely
            human-built. Cryptographic. Private. Irrefutable.
          </p>

          <div ref={r4} className="reveal d3 cta-pair">
            <div className="cta-block b2b">
              <div className="cta-row1">
                <div className="cta-audience b2b">For Agencies &amp; Studios</div>
                <div className="cta-ico b2b"><Building2 size={16} /></div>
              </div>
              <div className="cta-title">Secure Your Pipeline</div>
              <div className="cta-desc">Eliminate portfolio fraud, verify freelancer hours, and protect your brand from AI-washing risk before it becomes a liability.</div>
              <div className="cta-sep" />
              <div className="cta-link-row">Get agency access <ArrowUpRight size={13} /></div>
            </div>

            <div className="cta-block b2c">
              <div className="cta-row1">
                <div className="cta-audience b2c">For Creators &amp; Freelancers</div>
                <div className="cta-ico b2c"><UserCheck size={16} /></div>
              </div>
              <div className="cta-title">Protect Your Work</div>
              <div className="cta-desc">Own immutable proof of every project you've built. Make theft impossible to hide and every hour impossible to dispute.</div>
              <div className="cta-sep" />
              <div className="cta-link-row">Join the waitlist <ArrowUpRight size={13} /></div>
            </div>
          </div>
        </div>

        <div ref={r5} className="reveal d2 hero-graphic">
          <div className="mockup-header">
            <div className="mockup-dots">
              <div className="mockup-dot r" />
              <div className="mockup-dot y" />
              <div className="mockup-dot g" />
            </div>
          </div>
          <div className="mockup-body">
            <div className="mockup-panel">
              <div className="mockup-row">
                <div className="mockup-title"><Database size={16} style={{ color: '#818CF8' }} /> Adobe Premiere Pro</div>
                <div className="mockup-tag verified">Verified Session</div>
              </div>
              <div className="mockup-stats">
                <div className="mockup-stat">
                  <div className="mockup-val">48h 12m</div>
                  <div className="mockup-lbl">Total Human Labor</div>
                </div>
                <div className="mockup-stat">
                  <div className="mockup-val">99.8%</div>
                  <div className="mockup-lbl">Entropy Score</div>
                </div>
              </div>
            </div>

            <div className="mockup-panel">
              <div className="mockup-row" style={{ marginBottom: '0' }}>
                <div className="mockup-title"><Clock size={16} style={{ color: '#A78BFA' }} /> Immutable Audit Trail</div>
              </div>
              <div className="mockup-timeline">
                <div className="mockup-t-item">
                  <div className="mockup-t-time">14:02</div>
                  <div>Session Started - Cryptographic Signing Init</div>
                </div>
                <div className="mockup-t-item">
                  <div className="mockup-t-time">15:45</div>
                  <div>High Entropy Input Detected (120 APM)</div>
                </div>
                <div className="mockup-t-item">
                  <div className="mockup-t-time">18:30</div>
                  <div>Asset Rendered &amp; C2PA Manifest Appended</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="container">
        <div className="stats-inner">
          {[
            { n: "5,000+", l: "C2PA coalition members" },
            { n: "∞", l: "Labor hours unverified daily" },
            { n: "3", l: "Verification layers in the stack" },
            { n: "0", l: "Existing tools that prove labor" },
          ].map((s, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  return (
    <section className="problem-section" id="problem">
      <div className="container">
        <div className="problem-layout" style={{ marginTop: 0 }}>
          <div className="problem-left-col">
            <div ref={r1} className="reveal">
              <div className="eyebrow">Real-World Evidence</div>
              <h2 className="sec-headline">THE COST<br />OF SILENCE.</h2>
              <p className="sec-body">Two editors. Two stolen portfolios. Discovered by accident in a WhatsApp group. Trustable makes discovery automatic.</p>
            </div>

            <div ref={r2} className="reveal d1">
              <div className="cost-list">
                {[
                  { cls: 'r', I: AlertTriangle, t: 'No Proof of Authorship', b: 'Without verified timestamps and session data, there is no way to prove who was behind the keyboard when a project was created.' },
                  { cls: 'a', I: Eye, t: 'Theft Invisible at Scale', b: 'Fraudulent agencies clone portfolios and pitch them to clients. Creators only find out by accident — if ever.' },
                  { cls: 'i', I: Zap, t: 'AI-Washing Accelerates Risk', b: 'As generative AI floods every platform, even legitimate human work is treated with suspicion. Trust has collapsed.' },
                ].map((c, i) => (
                  <div key={i} className="cost-item">
                    <div className={`cost-ico ${c.cls}`}><c.I size={15} /></div>
                    <div>
                      <div className="cost-title">{c.t}</div>
                      <div className="cost-text">{c.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={r3} className="reveal d2 linkedin-col">
            <div className="linkedin-label">Case Study · Shrestha Sahni Incident</div>
            <div className="linkedin-frame-wrap" style={{ marginTop: '50px' }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7435661909619564544"
                height="496"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="Shrestha Sahni — Portfolio Theft"
              />
            </div>
            <div className="linkedin-caption">
              <strong>Theft discovered by accident in a WhatsApp group.</strong> No platform flagged it. No tool detected it. Two editors lost months of portfolio work overnight.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProtocolSection() {
  const r1 = useReveal(), r2 = useReveal();
  const layers = [
    { n: '01', I: Database, sub: 'Layer One', t: 'The Hub', b: 'OS-level process monitoring running silently in the background. Zero-visibility telemetry — we record active window time and input entropy, never the content itself.', tags: ['Zero-visibility', 'Privacy-first', 'Any app'] },
    { n: '02', I: Fingerprint, sub: 'Layer Two', t: 'Visual DNA', b: 'Perceptual hashing (pHash) that survives compression, re-encoding, and platform reposting. Your file has a fingerprint that cannot be separated from it.', tags: ['pHash', 'Compression-proof', 'Cross-platform'] },
    { n: '03', I: Lock, sub: 'Layer Three', t: 'The Ledger', b: 'Cryptographic linkage of Identity + Labor Score + Timestamp. Every session produces a tamper-evident chain. C2PA-compatible by design.', tags: ['C2PA-native', 'Cryptographic', 'Timestamped'] },
  ];
  return (
    <section className="protocol-section" id="solution">
      <div className="container">
        <div ref={r1} className="reveal" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>The Protocol</div>
          <h2 className="sec-headline">THREE LAYERS.<br />ONE TRUST STACK.</h2>
          <p className="sec-body" style={{ margin: '0 auto', textAlign: 'center' }}>C2PA proves the file. Trustable proves the labor. Together, an architecture no fraudulent claim can survive.</p>
        </div>
        <div ref={r2} className="reveal d1 layers-grid">
          {layers.map((l, i) => (
            <div key={i} className="layer-card">
              <div className="layer-n">{l.n}</div>
              <div className="layer-icon"><l.I size={20} /></div>
              <div>
                <div className="layer-sub">{l.sub}</div>
                <div className="layer-title">{l.t}</div>
              </div>
              <div className="layer-body">{l.b}</div>
              <div className="layer-tags">{l.tags.map((t, j) => <span key={j} className="layer-tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section className="compare-section" id="compare">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={r1} className="reveal" style={{ maxWidth: '800px' }}>
          <div className="eyebrow">The Trust Comparison</div>
          <h2 className="sec-headline">WHERE OTHERS STOP, WE DON'T.</h2>
          <p className="sec-body" style={{ maxWidth: '520px' }}>C2PA is the open-standard foundation. Trustable picks up exactly where it left off — adding the labor-proof layer the standard deliberately omitted.</p>
        </div>

        <div ref={r2} className="reveal d1 ctable-wrap">
          <table className="ctable">
            {/* Unified thead with tier info baked in */}
            <thead className="ctable-thead">
              <tr>
                <td className="ctable-th-empty" />
                <th className="ctable-th">
                  <div className="th-pad">
                    <div className="th-tier-tag">Open Standard</div>
                    <div className="th-tier-name">C2PA</div>
                    <div className="th-price-row">
                      <span className="th-price">Free</span>
                      <span className="th-price-sub">· forever</span>
                    </div>
                  </div>
                </th>
                <th className="ctable-th">
                  <div className="th-pad featured">
                    <div className="th-rec">Recommended</div>
                    <div className="th-tier-tag">Main App</div>
                    <div className="th-tier-name feat">Trustable Pro</div>
                    <div className="th-price-row">
                      <span className="th-price">Early Access</span>
                      <span className="th-price-sub">· beta</span>
                    </div>
                  </div>
                </th>
                <th className="ctable-th" style={{ borderRight: 'none' }}>
                  <div className="th-pad">
                    <div className="th-tier-tag">Browser Extension</div>
                    <div className="th-tier-name">Ext. Lite</div>
                    <div className="th-price-row">
                      <span className="th-price">Free</span>
                      <span className="th-price-sub">· coming soon</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => {
                if (row.cat) return (
                  <tr key={i}><td colSpan={4} className="ctable-cat">{row.cat}</td></tr>
                );
                return (
                  <tr key={i}>
                    <td className="ctable-lbl">{row.lbl}</td>
                    <td className="ctable-cell"><CI v={row.c} /></td>
                    <td className="ctable-cell feat"><CI v={row.a} /></td>
                    <td className="ctable-cell" style={{ borderRight: 'none' }}><CI v={row.e} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const r = useReveal();
  return (
    <section className="products-section">
      <div className="container">
        <div ref={r} className="reveal" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>The Suite</div>
          <h2 className="sec-headline" style={{ fontSize: '42px' }}>EVERYTHING TRUSTABLE MAKES</h2>
        </div>
        <div className="prod-grid">
          {[
            { I: Database, n: 'Trustable Hub', d: 'OS-level desktop application. Continuous session monitoring, Labor Scoring, and C2PA export for any creative app.', s: 'live', l: 'In Development' },
            { I: Globe, n: 'Browser Extension', d: 'Chrome extension with dual-badge verification — shows both C2PA and Trustable layers while browsing any portfolio platform.', s: 'soon', l: 'Coming Soon' },
            { I: Zap, n: 'Verification API', d: 'B2B endpoint for agencies, platforms, and news organizations to verify creator credentials programmatically at any scale.', s: 'soon', l: 'Coming Soon' },
          ].map((p, i) => (
            <div key={i} className="prod-card">
              <div className="prod-icon"><p.I size={20} /></div>
              <div className="prod-name">{p.n}</div>
              <div className="prod-desc">{p.d}</div>
              <div className={`prod-status ${p.s}`}><div className="sd" />{p.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const r = useReveal();
  return (
    <section className="status-section" id="early-access">
      <div className="container">
        <div ref={r} className="reveal beta-wrap">
          <div className="beta-left">
            <div className="beta-eyebrow"><div className="beta-dot" />Private Beta · Limited Access</div>
            <h2 className="beta-headline">BE FIRST TO<br />THE LEDGER.</h2>
            <p className="beta-sub">App and Extension are in private beta. We're onboarding agencies and creators in waves.</p>
          </div>
          <div className="beta-right">
            {!sent ? (
              <>
                <div className="email-form">
                  <input className="email-input" type="email" placeholder="you@studio.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && email.includes('@') && setSent(true)} />
                  <button className="email-btn" onClick={() => email.includes('@') && setSent(true)}>Notify Me <ArrowRight size={14} /></button>
                </div>
                <div className="email-hint">No spam · Beta invites only</div>
              </>
            ) : (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '14px', padding: '20px 24px', color: '#22C55E', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={18} /> You're on the list.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">TRUSTABLE</div>
            <div className="footer-copy">© 2026 Trustable · The Universal Verification Layer for Creative Labor</div>
          </div>
          <ul className="footer-links">
            {['Protocol', 'Privacy', 'C2PA Standard', 'Contact'].map(l => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function TrustableLanding() {
  return (
    <>
      <style>{styles}</style>
      <nav>
        <div className="nav-inner">
          <div className="nav-logo"><div className="nav-dot" />TRUSTABLE</div>
          <ul className="nav-links">
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#solution">Protocol</a></li>
            <li><a href="#compare">Compare</a></li>
            <li><a href="#early-access">Early Access</a></li>
          </ul>
          <div className="nav-pill">Private Beta</div>
        </div>
      </nav>
      <main>
        <HeroSection />
        <StatsStrip />
        <ProblemSection />
        <ProtocolSection />
        <CompareSection />
        <ProductsSection />
        <StatusSection />
      </main>
      <Footer />
    </>
  );
}
