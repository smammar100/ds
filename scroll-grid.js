// <scroll-grid> — perspective image grid animated on scroll (Codrops Scroll3DGrid, type1)
(function () {
  const BASE = "uploads/Scroll3DGrid-main/img/";

  class ScrollGrid extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      const count = parseInt(this.getAttribute("count") || "36", 10);
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
        <style>
          :host { display:block; width:100%; overflow:hidden; }
          .grid {
            display:grid; place-items:center; width:100%; padding:2rem 0;
            perspective:1000px;
          }
          .grid-wrap {
            width:100%; display:grid; grid-template-columns:repeat(4,1fr);
            gap:2vw; transform-style:preserve-3d;
          }
          .item {
            aspect-ratio:1.5; width:100%; overflow:hidden; position:relative;
            border-radius:8px; display:grid; place-items:center;
          }
          .inner {
            position:relative; width:200%; height:200%;
            background-size:cover; background-position:50% 50%;
          }
          @media (prefers-reduced-motion: reduce) {
            .grid-wrap { grid-template-columns:repeat(6,1fr); gap:10px; }
            .item { aspect-ratio:1; border-radius:4px; }
            .inner { width:100%; height:100%; }
          }
        </style>
        <div class="grid"><div class="grid-wrap"></div></div>`;

      const wrap = root.querySelector(".grid-wrap");
      const frag = document.createDocumentFragment();
      for (let i = 1; i <= count; i++) {
        const item = document.createElement("div");
        item.className = "item";
        const inner = document.createElement("div");
        inner.className = "inner";
        inner.style.backgroundImage = `url(${BASE}${i}.jpg)`;
        item.appendChild(inner);
        frag.appendChild(item);
      }
      wrap.appendChild(frag);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      this._animate(root, wrap);
    }

    _animate(root, wrap) {
      const start = () => {
        if (!window.gsap || !window.ScrollTrigger) return setTimeout(start, 120);
        const gsap = window.gsap;
        gsap.registerPlugin(window.ScrollTrigger);
        const items = [...root.querySelectorAll(".item")];
        const inners = items.map((el) => el.querySelector(".inner"));

        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: this, start: "top bottom+=5%", end: "bottom top+=35%", scrub: true }
        })
          .set(wrap, { rotationY: 25 })
          .set(items, { z: () => gsap.utils.random(-1600, 200) })
          .fromTo(items, { xPercent: () => gsap.utils.random(-1000, -500) },
                         { xPercent: () => gsap.utils.random(500, 1000) }, 0)
          .fromTo(inners, { scale: 2 }, { scale: 0.5 }, 0);
      };
      start();
    }
  }

  if (!customElements.get("scroll-grid")) customElements.define("scroll-grid", ScrollGrid);
})();
