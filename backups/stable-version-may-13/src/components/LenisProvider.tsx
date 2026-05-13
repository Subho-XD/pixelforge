"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile, skip Lenis entirely — native touch scroll is faster
  if (isMobile) return <>{children}</>;

  return (
    <ReactLenis root options={{
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.1
    }}>
      {children}
    </ReactLenis>
  );
}
