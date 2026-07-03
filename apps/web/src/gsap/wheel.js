import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Pub/sub for decade changes — listeners register before initWheel fires the first event
const decadeChangeCallbacks = [];
export function onDecadeChange(fn) { decadeChangeCallbacks.push(fn); }
function fireDecadeChange(decade) { decadeChangeCallbacks.forEach((fn) => fn(decade)); }

export function cleanup() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  decadeChangeCallbacks.length = 0;
  const existing = document.getElementById("wheel-obra-preview");
  if (existing) existing.remove();
}

export function initObraImage() {
  const rows = document.querySelectorAll("[data-img]");
  if (!rows.length) return;

  const existing = document.getElementById("wheel-obra-preview");
  if (existing) existing.remove();

  const preview = document.createElement("div");
  preview.id = "wheel-obra-preview";
  preview.style.cssText =
    "position:fixed;pointer-events:none;z-index:9999;width:220px;height:220px;opacity:0;top:0;left:0;";
  const img = document.createElement("img");
  img.style.cssText = "width:100%;height:100%;object-fit:cover;";
  preview.appendChild(img);
  document.body.appendChild(preview);

  let mouseX = 0;
  let mouseY = 0;
  let active = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (active) {
      gsap.to(preview, {
        x: mouseX + 20,
        y: mouseY + 20,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  });

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      active = true;
      img.src = row.dataset.img;
      gsap.set(preview, { x: mouseX + 20, y: mouseY + 20 });
      gsap.to(preview, { opacity: 1, duration: 0.2, ease: "power2.out" });
    });

    row.addEventListener("mouseleave", () => {
      active = false;
      gsap.to(preview, { opacity: 0, duration: 0.2, ease: "power2.in" });
    });
  });
}

export function initWheel() {
  const box = document.getElementById("wheel-box");
  if (!box) return;

  // Decade header elements, sorted oldest → newest
  const decadeEls = [];
  box.querySelectorAll("[data-decade-header]").forEach((el) => {
    decadeEls.push({ decade: parseInt(el.dataset.decadeHeader), el });
  });

  if (!decadeEls.length) return;
  decadeEls.sort((a, b) => a.decade - b.decade);

  let currentDecade = null;

  function setDecade(decade) {
    const d = String(decade);
    if (d !== currentDecade) {
      currentDecade = d;
      fireDecadeChange(d);
    }
  }

  decadeEls.forEach(({ decade, el }, index) => {
    ScrollTrigger.create({
      trigger: el,
      scroller: box,
      start: "top center",
      onEnter: () => setDecade(decade),
      onLeaveBack: () => {
        if (index > 0) setDecade(decadeEls[index - 1].decade);
      },
    });
  });

  // Fire initial decade (first marker is active at scroll position 0)
  setDecade(decadeEls[0].decade);
}

export function initDecadeNav() {
  const nav = document.getElementById("decade-nav");
  if (!nav) return;
  const items = nav.querySelectorAll("[data-decade-nav]");
  if (!items.length) return;
  const box = document.getElementById("wheel-box");

  onDecadeChange((decade) => {
    items.forEach((item) => {
      const isActive = item.dataset.decadeNav === decade;
      item.classList.toggle("is-active", isActive);
      if (isActive) {
        // Scroll this item to horizontal center (mobile)
        const navRect = nav.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const scrollTarget =
          nav.scrollLeft +
          (itemRect.left - navRect.left) -
          navRect.width / 2 +
          itemRect.width / 2;
        nav.scrollTo({ left: scrollTarget, behavior: "smooth" });
      }
    });
  });

  // Click a decade label → scroll the obra box to that decade's header
  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (!box) return;
      const decade = item.dataset.decadeNav;
      const firstObra = box.querySelector(`[data-decade="${decade}"]`);
      if (!firstObra) return;
      // The decade header div is the sibling immediately before the first obra row
      const target = firstObra.previousElementSibling ?? firstObra;
      const boxRect = box.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      box.scrollTo({
        top: box.scrollTop + (targetRect.top - boxRect.top) - boxRect.height / 2 + targetRect.height / 2,
        behavior: "smooth",
      });
    });
  });
}

export function initDecadeImages() {
  const imgs = document.querySelectorAll("[data-decade-img]");
  if (!imgs.length) return;

  const imgMap = {};
  imgs.forEach((img) => { imgMap[img.dataset.decadeImg] = img; });

  let currentImg = null;

  onDecadeChange((decade) => {
    const next = imgMap[decade];
    if (!next || next === currentImg) return;
    if (currentImg) gsap.to(currentImg, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
    gsap.to(next, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
    currentImg = next;
  });
}
