import type { InterludePoster } from '../../types';
import { RevealText } from '../effects/RevealText';

interface Props {
  poster: InterludePoster;
  isVisible: boolean;
}

export function InterludePage({ poster: _poster, isVisible }: Props) {
  return (
    <section data-index={2} className="poster-section interlude is-visible">
      <div className="interlude-gradient" />
      <div className="grain-overlay" />

      <div className="content-layer center">
        <div className="interlude-content">
          {/* 上部 - The Day Fades */}
          <div className="interlude-stanza">
            <RevealText delay={0.1} isVisible={isVisible} className="interlude-label light">
              The Day Fades
            </RevealText>
            <RevealText delay={0.15} isVisible={isVisible} className="interlude-divider">
              <div />
            </RevealText>
          </div>

          {/* 中部 - Between Shadows & Light */}
          <div className="interlude-stanza center-piece">
            <RevealText delay={0.3} isVisible={isVisible} className="interlude-title line2">
              Between Shadows
            </RevealText>
            <RevealText delay={0.4} isVisible={isVisible} className="interlude-title line2">
              & Light
            </RevealText>
          </div>

          {/* 下部 - Night Awaits */}
          <div className="interlude-stanza">
            <RevealText delay={0.15} isVisible={isVisible} className="interlude-divider">
              <div />
            </RevealText>
            <RevealText delay={0.7} isVisible={isVisible} className="interlude-label dark">
              Night Awaits
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
