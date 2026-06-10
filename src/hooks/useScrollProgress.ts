import { useState, useEffect, useRef, useCallback } from 'react';
import type { Poster } from '../types';

interface ScrollProgressResult {
  progress: number;
  activeIndex: number;
  visibleSections: Set<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const SCROLL_POSITION_KEY = 'monetwl-scroll-y';

/**
 * 滚动进度管理 Hook
 *
 * - 不吸附、不干预滚动
 * - 持久化滚动位置到 sessionStorage
 * - 初始化时恢复之前的位置
 */
export function useScrollProgress(posters: Poster[]): ScrollProgressResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreFlagRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  const calculateIndex = useCallback((scrollY: number) => {
    const windowHeight = window.innerHeight;
    const index = Math.round(scrollY / windowHeight);
    return Math.max(0, Math.min(posters.length - 1, index));
  }, [posters.length]);

  // 滚动监听 + 保存位置
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      const scrollY = window.scrollY;

      if (restoreFlagRef.current) {
        try {
          sessionStorage.setItem(SCROLL_POSITION_KEY, String(scrollY));
        } catch {
          // sessionStorage 不可用时静默忽略
        }
      }

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = Math.max(0, docHeight - windowHeight);

        setProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
        setActiveIndex(calculateIndex(scrollY));

        rafId = null;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [calculateIndex]);

  // 恢复滚动位置 + 激活保存标志
  useEffect(() => {
    let savedScrollY = 0;
    try {
      const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (saved) savedScrollY = parseInt(saved, 10) || 0;
    } catch {
      // 忽略
    }

    const startRestore = () => {
      if (savedScrollY > 0) {
        const tryRestore = () => {
          window.scrollTo(0, savedScrollY);
          // 手动派发 scroll 事件，让监听器同步 progress 状态
          window.dispatchEvent(new Event('scroll'));
        };
        requestAnimationFrame(tryRestore);
        setTimeout(tryRestore, 100);
        setTimeout(tryRestore, 400);
      }
      setTimeout(() => {
        restoreFlagRef.current = true;
      }, 500);
    };

    if (document.readyState === 'complete') {
      setTimeout(startRestore, 50);
    } else {
      window.addEventListener('load', () => setTimeout(startRestore, 50), { once: true });
    }
  }, []);

  // 章节可见性检测
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections(prev => {
          const next = new Set(prev);
          entries.forEach(entry => {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (entry.isIntersecting) next.add(index);
          });
          return next;
        });
      },
      { threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('[data-index]').forEach(section => observer.observe(section));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return { progress, activeIndex, visibleSections, containerRef };
}

export function useProgressColor(posters: Poster[], progress: number): string {
  const index = Math.min(posters.length - 1, Math.floor(progress * posters.length));
  return posters[index]?.theme.accent || '#D4A853';
}

export function useDisplayPageIndex(activeIndex: number): number {
  if (activeIndex <= 0) return 0;
  if (activeIndex === 2) return 1;
  if (activeIndex >= 3) return 2;
  return 1;
}
