import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  useEffect(() => {
    // Let the browser handle scroll restoration (refresh/back/forward).
    // We only override for actual navigations initiated by links (PUSH).
    window.history.scrollRestoration = "auto";
  }, []);

  useEffect(() => {
    // Do not fight browser scroll restoration for POP (back/forward).
    // For refresh/initial load, there is no PUSH; so this effect won't scroll.
    if (navigationType !== "PUSH") return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, navigationType]);

  return null;
}
