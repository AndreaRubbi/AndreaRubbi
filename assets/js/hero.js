'use strict';

/* ============================================================
   AI × BIO HERO ANIMATION
   Draws a slowly rotating DNA double-helix made of glowing
   nodes (a "neural network meets genome" motif) on the
   <canvas data-hero-dna> element in the About page.

   You normally don't need to touch this file. A few knobs you
   CAN safely tweak are grouped in the CONFIG block below.
   ============================================================ */

(function () {

  const canvas = document.querySelector('[data-hero-dna]');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- CONFIG (safe to tweak) ---- */
  const CONFIG = {
    strandA: 'hsl(168, 84%, 55%)',   // teal strand colour
    strandB: 'hsl(255, 92%, 74%)',   // violet strand colour
    nodes: 46,                       // number of points along the helix
    turns: 3.2,                      // how many twists fit across the width
    speed: 0.55                      // rotation speed
  };

  let w = 0, h = 0, dpr = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);

    const cy = h / 2;
    const amp = Math.min(h * 0.30, 48);
    const nodesA = [];
    const nodesB = [];

    for (let i = 0; i < CONFIG.nodes; i++) {
      const p = i / (CONFIG.nodes - 1);
      const x = p * w;
      const theta = p * Math.PI * 2 * CONFIG.turns + t;
      const depth = Math.cos(theta);           // -1 (back) .. 1 (front)
      nodesA.push({ x: x, y: cy + amp * Math.sin(theta), depth: depth });
      nodesB.push({ x: x, y: cy - amp * Math.sin(theta), depth: depth });
    }

    // rungs (base pairs) connecting the two strands
    for (let i = 0; i < CONFIG.nodes; i++) {
      const a = nodesA[i];
      const b = nodesB[i];
      const near = (a.depth + 1) / 2;
      ctx.globalAlpha = 0.10 + 0.24 * near;
      ctx.strokeStyle = i % 2 ? CONFIG.strandB : CONFIG.strandA;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // the two backbone strands
    drawStrand(nodesA, CONFIG.strandA);
    drawStrand(nodesB, CONFIG.strandB);

    // glowing nodes
    drawNodes(nodesA, CONFIG.strandA);
    drawNodes(nodesB, CONFIG.strandB);

    ctx.globalAlpha = 1;
  }

  function drawStrand(nodes, color) {
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < nodes.length; i++) {
      if (i === 0) ctx.moveTo(nodes[i].x, nodes[i].y);
      else ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.stroke();
  }

  function drawNodes(nodes, color) {
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const near = (n.depth + 1) / 2;
      const r = 1.5 + 3 * near;
      ctx.globalAlpha = 0.35 + 0.6 * near;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 9 * near;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  resize();
  window.addEventListener('resize', resize);
  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvas);
  }

  // Static single frame for reduced-motion visitors.
  if (reduceMotion) {
    draw(0.6);
    return;
  }

  let start = null;
  function loop(ts) {
    if (start === null) start = ts;
    draw((ts - start) / 1000 * CONFIG.speed);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})();
