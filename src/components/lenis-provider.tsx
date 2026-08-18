"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Disable Lenis smooth scroll on mobile devices
    if (isMobile) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 35,
      prevent: (node) => {
        // Prevent Lenis on all dialog-related elements
        return node.closest('[data-radix-dialog-content], [data-radix-dialog-overlay], [role="dialog"], .dialog-content') !== null;
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.5,
          });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener("click", handleAnchorClick);
    });

    return () => {
      lenis.destroy();
      anchorLinks.forEach(link => {
        link.removeEventListener("click", handleAnchorClick);
      });
    };
  }, [isMobile]);

  return <>{children}</>;
}