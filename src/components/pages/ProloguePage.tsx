import type { ProloguePoster } from '../../types';
import { RevealText } from '../effects/RevealText';

interface Props {
  poster: ProloguePoster;
  isVisible: boolean;
}

export function ProloguePage({ poster, isVisible }: Props) {
  const { typography } = poster;

  return (
    <section data-index={0} className="poster-section prologue is-visible">
      <div className="prologue-gradient" />
      <div className="grain-overlay" />
      <div className="content-layer center">
        <div className="prologue-content">
          <RevealText delay={0.1} isVisible={isVisible} className="prologue-pretitle">
            {typography.subtitle}
          </RevealText>
          <RevealText delay={0.2} isVisible={isVisible} className="prologue-brand">
            {typography.brand}
          </RevealText>
          <RevealText delay={0.3} isVisible={isVisible} className="prologue-collection">
            {typography.collection}
          </RevealText>
          <RevealText delay={0.4} isVisible={isVisible} className="prologue-line">
            <div />
          </RevealText>
          <RevealText delay={0.5} isVisible={isVisible} className="prologue-year">
            {typography.year}
          </RevealText>
        </div>
      </div>
    </section>
  );
}
