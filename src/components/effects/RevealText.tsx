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

  // 浮动动画在入场动画完成后再开始（1.2s transition + delay）
  const animationDelay = isVisible ? 1.2 + delay + float.delay : 0;

  return (
    <div
      className={`reveal-item ${className} ${isVisible ? 'revealed' : ''}`}
      style={{
        transitionDelay: `${delay}s`,
      }}
    >
      {/* 浮动动画应用到子元素，避免与父元素的 transform transition 冲突 */}
      <span
        className="float-wrapper"
        style={{
          display: 'inline-block',
          animation: isVisible ? `lazy-float ${float.duration}s ease-in-out ${animationDelay}s infinite` : 'none',
          ['--float-y' as string]: `${float.yOffset}px`,
        }}
      >
        {children}
      </span>
    </div>
  );
}

