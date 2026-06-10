import { useMemo } from 'react';
import type { ImagePoster } from '../../types';

interface Props {
  poster: ImagePoster;
  index: number;
  isVisible: boolean;
  parallaxStyle?: React.CSSProperties;
}

export function PosterPage({ poster, index, isVisible, parallaxStyle }: Props) {
  const { typography, labels, theme, textPosition, image } = poster;

  // 缓存渐变计算
  const gradient = useMemo(() => {
    if (textPosition === 'left') {
      return `linear-gradient(to right,${theme.bg}f0 0%,${theme.bg}a0 30%,${theme.bg}40 50%,transparent 70%)`;
    }
    return `linear-gradient(to left,${theme.bg}f0 0%,${theme.bg}a0 30%,${theme.bg}40 50%,transparent 70%)`;
  }, [textPosition, theme.bg]);

  // 缓存遮罩方向
  const maskDirection = useMemo(() => {
    return {
      maskImage: textPosition === 'left'
        ? 'linear-gradient(to right, black 30%, transparent 100%)'
        : 'linear-gradient(to left, black 30%, transparent 100%)',
      positionSide: textPosition === 'left' ? 'left' as const : 'right' as const
    };
  }, [textPosition]);

  const overlayGradient = gradient;

  return (
    <section
      data-index={index}
      className={`poster-section is-visible poster-${textPosition}`}
      style={parallaxStyle}
    >
      {/* 视差背景 - 使用 CSS 变量驱动 */}
      <div
        className="parallax-bg"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="section-overlay" style={{ background: overlayGradient }} />
      <div
        className="text-blur-mask"
        data-position={textPosition}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          [maskDirection.positionSide]: '0',
          width: '45vw',
          height: '70vh',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          maskImage: maskDirection.maskImage,
          WebkitMaskImage: maskDirection.maskImage,
          pointerEvents: 'none',
          zIndex: 5
        }}
      />
      <div className="grain-overlay" />
      <div className={`content-layer ${textPosition}`}>
        {/* 标题组 - 使用 CSS 动画而非 JS 计算 */}
        <div
          className={`title-group ${isVisible ? 'revealed' : ''}`}
          data-visible={isVisible}
        >
          <span className="season-label" style={{ transitionDelay: '0ms' }}>
            <span>{labels.season}</span>
            <span className="separator">—</span>
            <span>{labels.year}</span>
          </span>
          <span className="subtitle" style={{ transitionDelay: '150ms' }}>
            {typography.subtitle}
          </span>
          <h1
            className="main-title"
            style={{
              transitionDelay: '300ms',
              background: `linear-gradient(180deg,${theme.accentSecondary} 0%,${theme.accent} 50%,${theme.accentSecondary} 100%)`
            }}
          >
            {typography.title}
          </h1>
          <div className="accent-line" style={{ transitionDelay: '450ms' }}>
            <div style={{ background: `linear-gradient(90deg,${theme.accent},transparent)` }} />
          </div>
          <p className="description">
            {typography.description}
          </p>
          <div className="credits" style={{ transitionDelay: '750ms' }}>
            <span>Photography</span>
            <span className="dot" style={{ backgroundColor: theme.accent }} />
            <span>Fashion Editorial</span>
            <span className="dot" style={{ backgroundColor: theme.accent }} />
            <span>MONETWL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
