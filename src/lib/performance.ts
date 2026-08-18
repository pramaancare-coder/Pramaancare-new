// Performance optimization utilities

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Forum&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap'
    ];

    fontPreloads.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }
}

/**
 * Optimize images with intersection observer for lazy loading
 */
export function setupIntersectionObserver() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });

    return observer;
  }
}

/**
 * Preconnect to external domains
 */
export function setupPreconnections() {
  if (typeof window !== 'undefined') {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://fse.jegtheme.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
}

/**
 * Optimize scroll performance
 */
export function setupSmoothScrolling() {
  if (typeof window !== 'undefined') {
    // Add CSS for smooth scrolling if not already present
    if (!document.querySelector('[data-smooth-scroll]')) {
      const style = document.createElement('style');
      style.setAttribute('data-smooth-scroll', 'true');
      style.textContent = `
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/**
 * Setup viewport meta tag optimization
 */
export function optimizeViewport() {
  if (typeof window !== 'undefined') {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    }
  }
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  if (typeof window !== 'undefined') {
    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        setupPreconnections();
        setupSmoothScrolling();
        optimizeViewport();
        setupIntersectionObserver();
      });
    } else {
      preloadCriticalResources();
      setupPreconnections();
      setupSmoothScrolling();
      optimizeViewport();
      setupIntersectionObserver();
    }
  }
}