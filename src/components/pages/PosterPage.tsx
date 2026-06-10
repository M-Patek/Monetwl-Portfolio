import type { ImagePoster } from '../../types';
import { RevealText } from '../effects/RevealText';

interface Props {
  poster: ImagePoster;
  index: number;
  isVisible: boolean;
  parallaxOffset: number;
}

export function PosterPage({ poster, index, isVisible, parallaxOffset }: Props) {
  const { typography, labels, theme, textPosition, image } = poster;

  const overlayGradient = textPosition === 'left'
    ? `linear-gradient(to right,${theme.bg}f0 0%,${theme.bg}a0 30%,${theme.bg}40 50%,transparent 70%)`
    : `linear-gradient(to left,${theme.bg}f0 0%,${theme.bg}a0 30%,${theme.bg}40 50%,transparent 70%)`;

  return (
    <section data-index={index} className={`poster-section is-visible poster-${textPosition}`}>
      <div
        className="parallax-bg"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${parallaxOffset * 0.2}px)`
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
          [textPosition === 'left' ? 'left' : 'right']: '0',
          width: '45vw',
          height: '70vh',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: textPosition === 'left'
            ? 'linear-gradient(to right, black 30%, transparent 100%)'
            : 'linear-gradient(to left, black 30%, transparent 100%)',
          WebkitMaskImage: textPosition === 'left'
            ? 'linear-gradient(to right, black 30%, transparent 100%)'
            : 'linear-gradient(to left, black 30%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />
      <div className="grain-overlay" />
      <div className={`content-layer ${textPosition}`}>
        <RevealText delay={0} isVisible={isVisible} className="season-label">
          <span>{labels.season}</span>
          <span className="separator">—</span>
          <span>{labels.year}</span>
        </RevealText>

        <div className="title-group">
          <RevealText delay={0.15} isVisible={isVisible} className="subtitle">
            {typography.subtitle}
          </RevealText>
          <h1
            className={`reveal-item main-title ${isVisible ? 'revealed' : ''}`}
            style={{
              transitionDelay: '0.3s',
              background: `linear-gradient(180deg,${theme.accentSecondary} 0%,${theme.accent} 50%,${theme.accentSecondary} 100%)`
            }}
          >
            {typography.title}
          </h1>
          <RevealText delay={0.45} isVisible={isVisible} className="accent-line">
            <div style={{ background: `linear-gradient(90deg,${theme.accent},transparent)` }} />
          </RevealText>
          <RevealText delay={0.6} isVisible={isVisible} className="description">
            {typography.description}
          </RevealText>
        </div>

        <RevealText delay={0.75} isVisible={isVisible} className="credits">
          <span>Photography</span>
          <span className="dot" style={{ backgroundColor: theme.accent }} />
          <span>Fashion Editorial</span>
          <span className="dot" style={{ backgroundColor: theme.accent }} />
          <span>MONETWL</span>
        </RevealText>
      </div>
    </section>
  );
}
