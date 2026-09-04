// footer-fx: dithered canvas fields for the closing/footer band.
// <footer-fx variant="assemble|spotlight|scanline|ripple|threshold" text="doublespeed" cell="4">
if (!window.__footerFxLoaded) {
window.__footerFxLoaded = true;
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16));

class FooterFx extends HTMLElement {
  connectedCallback() {
    if (this._on) return;
    this._on = true;
    this.style.position = this.style.position || "absolute";
    this.style.inset = "0";
    this.style.display = "block";
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "width:100%;height:100%;display:block";
    this.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.cell = Math.max(2, +(this.getAttribute("cell") || 4));
    this.variant = this.getAttribute("variant") || "threshold";
    this.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.p = { x: -9999, y: -9999, on: false };
    this.reveal = 0;
    this.progress = 0;
    this.t0 = performance.now();

    this._pm = (e) => {
      const r = this.getBoundingClientRect();
      this.p = { x: e.clientX - r.left, y: e.clientY - r.top, on: true };
    };
    this._pl = () => { this.p.on = false; };
    window.addEventListener("pointermove", this._pm, { passive: true });
    this.addEventListener("pointerleave", this._pl);

    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(this);
    this._io = new IntersectionObserver((es) => { this.vis = es[0].isIntersecting; }, { threshold: 0 });
    this._io.observe(this);

    this.loadSource();
    this.resize();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.buildMask());
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("pointermove", this._pm);
    if (this._ro) this._ro.disconnect();
    if (this._io) this._io.disconnect();
    this._on = false;
  }

  // Optional image/video source sampled at cell resolution (luminance + color).
  loadSource() {
    const src = this.getAttribute("src");
    if (!src) return;
    if (/\.(mp4|webm|mov)$/i.test(src)) {
      const v = document.createElement("video");
      v.src = src; v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none";
      this.appendChild(v);
      v.play().catch(() => {});
      this.src = v; this.srcLive = true;
    } else {
      const im = new Image();
      im.onload = () => { this.src = im; this.sample(); };
      im.src = src;
    }
    this.sc = document.createElement("canvas");
    this.sg = this.sc.getContext("2d", { willReadFrequently: true });
  }

  sample() {
    const s = this.src;
    if (!s || !this.cols) return;
    const sw = s.videoWidth || s.naturalWidth, sh = s.videoHeight || s.naturalHeight;
    if (!sw || !sh) return;
    this.sc.width = this.cols; this.sc.height = this.rows;
    const scale = Math.max(this.cols / sw, this.rows / sh);
    const dw = sw * scale, dh = sh * scale;
    const fy = +(this.getAttribute("focus-y") || 0.5);
    this.sg.drawImage(s, (this.cols - dw) / 2, (this.rows - dh) * fy, dw, dh);
    const d = this.sg.getImageData(0, 0, this.cols, this.rows).data;
    if (!this.lum || this.lum.length !== this.cols * this.rows) {
      this.lum = new Float32Array(this.cols * this.rows);
      this.rgb = new Uint8ClampedArray(this.cols * this.rows * 3);
    }
    const gain = +(this.getAttribute("gain") || 1.35);
    for (let i = 0; i < this.lum.length; i++) {
      const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2];
      this.lum[i] = Math.min(1, ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * gain);
      this.rgb[i * 3] = r; this.rgb[i * 3 + 1] = g; this.rgb[i * 3 + 2] = b;
    }
  }

  resize() {
    const r = this.getBoundingClientRect();
    this.w = Math.max(1, Math.floor(r.width));
    this.h = Math.max(1, Math.floor(r.height));
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.cols = Math.ceil(this.w / this.cell);
    this.rows = Math.ceil(this.h / this.cell);
    this.buildMask();
    this.sample();
  }

  // Raster the wordmark/phrase into a low-res alpha grid the field can sample.
  buildMask() {
    const text = this.getAttribute("text");
    if (!text || !this.cols) { this.mask = null; return; }
    const c = document.createElement("canvas");
    c.width = this.cols;
    c.height = this.rows;
    const g = c.getContext("2d");
    const family = this.getAttribute("font") || "'Geist', system-ui, sans-serif";
    const weight = this.getAttribute("weight") || "600";
    const frac = +(this.getAttribute("fit") || 0.92);
    let size = 10;
    g.font = `${weight} ${size}px ${family}`;
    const target = this.cols * frac;
    size = Math.max(4, (target / g.measureText(text).width) * size);
    const maxH = this.rows * +(this.getAttribute("fit-height") || 1);
    size = Math.min(size, maxH);
    g.font = `${weight} ${size}px ${family}`;
    g.fillStyle = "#fff";
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    const align = this.getAttribute("align") || "bottom";
    const y = align === "middle" ? this.rows / 2 + size * 0.36 : this.rows - size * 0.14;
    g.fillText(text, this.cols / 2, y);
    const d = g.getImageData(0, 0, this.cols, this.rows).data;
    const m = new Float32Array(this.cols * this.rows);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] / 255;
    this.mask = m;
    this.noise = new Float32Array(m.length);
    for (let i = 0; i < m.length; i++) this.noise[i] = Math.random();
  }

  loop(now) {
    this.raf = requestAnimationFrame(this.loop);
    if (!this.vis) return;
    const t = (now - this.t0) / 1000;
    const r = this.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    this.progress = Math.min(1, Math.max(0, 1 - r.top / vh));
    this.reveal += ((this.progress > 0.08 ? 1 : 0) - this.reveal) * 0.045;
    if (this.srcLive) this.sample();
    this.draw(this.reduce ? 0 : t);
  }

  field(cx, cy, t) {
    const i = cy * this.cols + cx;
    const m = this.mask ? this.mask[i] : 0;
    const nz = this.noise ? this.noise[i] : 0.5;
    const px = cx * this.cell, py = cy * this.cell;
    const L = this.lum ? this.lum[i] : 0;
    switch (this.variant) {
      case "image-tune": {
        // Static noise resolves into the picture as the band scrolls in.
        const r = Math.min(1, this.reveal * 1.15);
        const flick = 0.5 + 0.5 * Math.sin(t * 9 + nz * 40 + cy * 0.7);
        const noise = nz * 0.55 * flick;
        return noise * (1 - r) + L * r + m * 0.9 * r;
      }
      case "image-clear": {
        // Dithered everywhere; the pointer window is painted in true color in draw().
        return 0.1 + L * 1.05 + m * 0.9;
      }
      case "image-scan": {
        const sweep = ((t * 0.2) % 1.4 - 0.2) * this.h;
        const band = Math.max(0, 1 - Math.abs(py - sweep) / 110);
        return L * (0.55 + band * 1.1) + m * 0.9;
      }
      case "image-fade": {
        // Picture strongest at the bottom edge, thinning upward; slow drift.
        const gy = py / this.h;
        const ramp = Math.pow(gy, 1.6);
        return L * ramp * (0.7 + 0.3 * this.reveal) + 0.02 * Math.sin(t + gy * 8) + m * 0.9;
      }
      case "assemble": {
        const r = this.reveal;
        const gate = nz < r * 1.15 ? 1 : 0;
        return m * gate * (0.35 + 0.65 * r);
      }
      case "spotlight": {
        const d = Math.hypot(px - this.p.x, py - this.p.y);
        const rad = 260;
        const near = this.p.on ? Math.max(0, 1 - d / rad) : 0;
        const breathe = 0.06 + 0.03 * Math.sin(t * 0.8 + cx * 0.05);
        return m * (breathe + Math.pow(near, 1.6) * 1.25);
      }
      case "scanline": {
        const sweep = ((t * 0.26) % 1.35 - 0.18) * this.h;
        const band = Math.max(0, 1 - Math.abs(py - sweep) / 130);
        return m * (0.16 + Math.pow(band, 1.4) * 1.5) + band * band * 0.16 * nz;
      }
      case "ripple": {
        const d = Math.hypot(px - this.p.x, py - this.p.y);
        const wave = this.p.on ? Math.sin(d * 0.055 - t * 3.4) * Math.max(0, 1 - d / 420) : 0;
        const amb = Math.sin(px * 0.006 + t * 0.5) * Math.cos(py * 0.012 - t * 0.35);
        return m * (0.3 + wave * 0.85) + 0.16 * (0.5 + 0.5 * amb) * (1 - m) * 0.55;
      }
      default: {
        const gx = px / this.w, gy = py / this.h;
        const grad = Math.pow(gx, 1.5) * 0.9 + gy * 0.35;
        const drift = 0.06 * Math.sin(t * 0.5 + gy * 6);
        return (grad + drift) * (0.35 + 0.65 * this.reveal) + m * 0.55 * this.reveal;
      }
    }
  }

  draw(t) {
    const { ctx, cell } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.fillStyle = "#ededed";
    const dot = Math.max(1, cell - 2);
    let jitter = 0;
    if (this.variant === "assemble") jitter = (1 - this.reveal) * 46;
    for (let cy = 0; cy < this.rows; cy++) {
      for (let cx = 0; cx < this.cols; cx++) {
        const v = this.field(cx, cy, t);
        if (v <= 0.02) continue;
        if (v < BAYER[cy & 3][cx & 3]) continue;
        let x = cx * cell, y = cy * cell;
        if (jitter > 0.5) {
          const i = cy * this.cols + cx;
          const n1 = this.noise ? this.noise[i] : 0.5;
          const n2 = this.noise ? this.noise[(i * 7 + 13) % this.noise.length] : 0.5;
          x += (n1 - 0.5) * jitter * 2.4;
          y += (n2 - 0.5) * jitter;
        }
        ctx.globalAlpha = Math.min(1, 0.4 + v * 0.6);
        ctx.fillRect(x, y, dot, dot);
      }
    }
    ctx.globalAlpha = 1;
    if (this.variant === "image-clear" && this.rgb && this.p.on) {
      // Pointer window: true-color cells inside a soft radius.
      const rad = +(this.getAttribute("radius") || 170);
      const c0 = Math.max(0, Math.floor((this.p.x - rad) / cell)), c1 = Math.min(this.cols - 1, Math.ceil((this.p.x + rad) / cell));
      const r0 = Math.max(0, Math.floor((this.p.y - rad) / cell)), r1 = Math.min(this.rows - 1, Math.ceil((this.p.y + rad) / cell));
      for (let cy = r0; cy <= r1; cy++) {
        for (let cx = c0; cx <= c1; cx++) {
          const d = Math.hypot(cx * cell - this.p.x, cy * cell - this.p.y);
          if (d > rad) continue;
          const a = Math.pow(1 - d / rad, 0.7);
          const i = cy * this.cols + cx;
          ctx.globalAlpha = a;
          ctx.fillStyle = `rgb(${this.rgb[i * 3]},${this.rgb[i * 3 + 1]},${this.rgb[i * 3 + 2]})`;
          ctx.fillRect(cx * cell, cy * cell, cell, cell);
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ededed";
    }
  }
}

if (!customElements.get("footer-fx")) customElements.define("footer-fx", FooterFx);
}
