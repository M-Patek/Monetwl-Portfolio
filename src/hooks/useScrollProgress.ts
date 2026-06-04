import { useState, useEffect, useRef } from 'react';
import type { Poster } from '../types';

interface ScrollProgressResult {
  progress: number;
  activeIndex: number;
  visibleSections: Set<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useScrollProgress(posters: Poster[]): ScrollProgressResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = containerRef.current.scrollHeight - windowHeight;
      const currentProgress = scrollTop / totalHeight;

      setProgress(currentProgress);

      const newIndex = Math.min(
        posters.length - 1,
        Math.floor(scrollTop / windowHeight + 0.3)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posters.length]);

  // Intersection Observer - 文字浮现
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleSections((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              next.add(index);
            }
            return next;
          });
        });
      },
      {
        threshold: [0, 0.2, 0.5, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const sections = document.querySelectorAll('[data-index]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [posters.length]);

  return { progress, activeIndex, visibleSections, containerRef };
}

// 计算进度条颜色
export function useProgressColor(posters: Poster[], progress: number): string {
  return posters[Math.min(posters.length - 1, Math.floor(progress * posters.length))]?.theme.accent || '#D4A853';
}

// 计算显示页码（跳过过渡页）
export function useDisplayPageIndex(activeIndex: number): number {
  if (activeIndex <= 0) return 0;
  if (activeIndex === 2) return 1;
  if (activeIndex >= 3) return 2;
  return 1;
}
