import type { InterludePoster } from '../../types';
import { RevealText } from '../effects/RevealText';

interface Props {
  poster: InterludePoster;
  isVisible: boolean;
}

export function InterludePage({ poster, isVisible }: Props) {
  const { typography } = poster;

  return (
    <section data-index={2} className="poster-section interlude is-visible">
      <div className="interlude-gradient" />
      <div className="grain-overlay" />
      <div className="content-layer center">
        <div className="interlude-content">
          <RevealText delay={0.1} isVisible={isVisible} className="interlude-pretitle">
            {typography.pretitle}
          </RevealText>
          <RevealText delay={0.2} isVisible={isVisible} className="interlude-title">
            {typography.title}
          </RevealText>
          <RevealText delay={0.3} isVisible={isVisible} className="interlude-title line2">
            {typography.titleLine2}
          </RevealText>
          <RevealText delay={0.4} isVisible={isVisible} className="interlude-line">
            <div />
          </RevealText>
          <RevealText delay={0.5} isVisible={isVisible} className="interlude-quote">
            {typography.quote}
          </RevealText>
        </div>
      </div>
    </section>
  );
}
