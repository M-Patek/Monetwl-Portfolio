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

      {/* 四角编辑信息 */}
      <div className="corner top-left">
        <span>Director</span>
        <span>MONETWL</span>
      </div>
      <div className="corner top-right">
        <span>Photography</span>
        <span>Editorial</span>
      </div>
      <div className="corner bottom-left">
        <span>Location</span>
        <span>Shanghai</span>
      </div>
      <div className="corner bottom-right">
        <span>Issue No.</span>
        <span>001</span>
      </div>

      <div className="content-layer center">
        <div className="prologue-content">
          <RevealText delay={0.15} isVisible={isVisible} className="prologue-pretitle">
            {typography.subtitle}
          </RevealText>
          <RevealText delay={0.25} isVisible={isVisible} className="prologue-top-line">
            <div />
          </RevealText>
          <RevealText delay={0.4} isVisible={isVisible} className="prologue-brand">
            {typography.brand}
          </RevealText>
          <RevealText delay={0.6} isVisible={isVisible} className="prologue-collection">
            {typography.collection}
          </RevealText>
          <RevealText delay={0.8} isVisible={isVisible} className="prologue-line">
            <div />
          </RevealText>
          <RevealText delay={1.0} isVisible={isVisible} className="prologue-year">
            {typography.year}
          </RevealText>
        </div>
      </div>

      {/* 滚动指示 */}
      <div className="prologue-scroll">
        <span>Scroll</span>
        <div className="prologue-scroll-line" />
      </div>
    </section>
  );
}
