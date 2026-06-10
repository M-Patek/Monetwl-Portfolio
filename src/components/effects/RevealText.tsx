import { useMemo } from 'react';
import type { RevealAnimationProps } from '../../types';

// 生成随机微浮动动画参数
function getRandomFloat() {
  const duration = 6 + Math.random() * 4; // 6-10s
  const delay = Math.random() * 2; // 0-2s
  const yOffset = 1.5 + Math.random() * 2; // 1.5-3.5px
  return { duration, delay, yOffset };
}

export function RevealText({
  children,
  delay = 0,
  isVisible,
  className = ''
}: RevealAnimationProps) {
  // 缓存随机动画参数，避免每次渲染重新生成
  const float = useMemo(() => getRandomFloat(), []);

  return (
    <div
      className={`reveal-item ${className} ${isVisible ? 'revealed' : ''}`}
      style={{
        transitionDelay: `${delay}s`,
        animation: isVisible ? `lazy-float ${float.duration}s ease-in-out ${float.delay}s infinite` : 'none',
        ['--float-y' as string]: `${float.yOffset}px`
      }}
    >
      {children}
    </div>
  );
}

