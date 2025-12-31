"use client";

import { useEffect } from 'react';

export function CriticalPerformance() {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        document.querySelectorAll('img').forEach(img => {
          if (!(img as HTMLImageElement).loading) (img as HTMLImageElement).loading = 'lazy';
          if (!(img as HTMLImageElement).decoding) (img as HTMLImageElement).decoding = 'async';
        });
      });
    }
  }, []);

  return null;
}