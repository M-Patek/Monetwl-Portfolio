import type { InterludePoster } from '../../types';

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
          {/* 上部 - The Day Fades（从左到右渐显） */}
          <div className="interlude-stanza">
            <span
              className={`interlude-label light reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.2s' }}
            >
              The Day Fades
            </span>
            <div
              className={`interlude-divider reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div />
            </div>
          </div>

          {/* 中部 - Between Shadows & Light（从左到右渐显） */}
          <div className="interlude-stanza center-piece">
            <h2
              className={`interlude-title line2 reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.5s' }}
            >
              Between Shadows
            </h2>
            <h2
              className={`interlude-title line2 reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.9s' }}
            >
              & Light
            </h2>
          </div>

          {/* 下部 - Night Awaits（从左到右渐显） */}
          <div className="interlude-stanza">
            <div
              className={`interlude-divider reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div />
            </div>
            <span
              className={`interlude-label dark reveal-l2r ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: '1.3s' }}
            >
              Night Awaits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
