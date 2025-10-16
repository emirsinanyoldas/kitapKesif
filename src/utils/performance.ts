/**
 * Performance monitoring utilities
 */

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string, callback: () => void): void {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
  } else {
    callback();
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load image with intersection observer
 */
export function lazyLoadImage(imageElement: HTMLImageElement): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    observer.observe(imageElement);
  } else {
    // Fallback for browsers without IntersectionObserver
    if (imageElement.dataset.src) {
      imageElement.src = imageElement.dataset.src;
    }
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(url: string, type: 'image' | 'script' | 'style'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  switch (type) {
    case 'image':
      link.as = 'image';
      break;
    case 'script':
      link.as = 'script';
      break;
    case 'style':
      link.as = 'style';
      break;
  }
  
  document.head.appendChild(link);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get connection quality
 */
export function getConnectionQuality(): 'slow' | 'fast' | 'unknown' {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    return 'unknown';
  }
  
  // Check effective connection type
  if (connection.effectiveType === '4g') {
    return 'fast';
  } else if (connection.effectiveType === '3g' || connection.effectiveType === '2g') {
    return 'slow';
  }
  
  return 'unknown';
}

/**
 * Request idle callback for non-critical tasks
 */
export function runWhenIdle(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
}
