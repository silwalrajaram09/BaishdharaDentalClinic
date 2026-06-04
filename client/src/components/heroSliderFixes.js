
const styleId = "hero-slider-fixes";

function ensureStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    /* Avoid any accidental horizontal overflow from long text inside the slider */
    .hero-slider-fix-title {
      overflow-wrap: anywhere;
      word-break: break-word;
    }
  `;
  document.head.appendChild(style);
}

ensureStyle();

export default null;
