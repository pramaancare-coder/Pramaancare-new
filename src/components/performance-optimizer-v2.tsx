"use client";

import { useEffect } from 'react';

export function PerformanceOptimizerV2() {
  useEffect(() => {
    const init = () => {
      // Lazy load offscreen images
      if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          (img as HTMLImageElement).loading = 'lazy';
        });
      } else if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, { rootMargin: '200px' });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
      }

      // Optimize animations for reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 1);
    }
  }, []);

  return null;
}