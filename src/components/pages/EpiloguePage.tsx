import { RevealText } from '../effects/RevealText';

interface Props {
  isVisible: boolean;
  isRevealed: boolean;
  currentIndex?: number;
}

const chapters = [
  { index: 0, label: 'Prologue' },
  { index: 1, label: 'Diurne' },
  { index: 2, label: 'Interlude' },
  { index: 3, label: 'Nocturne' },
  { index: 4, label: 'Epilogue' },
];

export function EpiloguePage({ isVisible, isRevealed, currentIndex = 4 }: Props) {
  const handleNavigate = (index: number) => {
    const section = document.querySelector(`[data-index="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section data-index={4} className="poster-section epilogue is-visible">
      <div className="epilogue-gradient" />
      <div className="grain-overlay" />

      <div className="content-layer center">
        {/* 中央大文字 - 封印式设计 */}
        <div className={`epilogue-end ${isRevealed ? 'revealed' : ''}`}>
          <div className="vertical-line top" />
          <span className="end-outline">END</span>
          <span className="end-solid">END</span>
          <div className="vertical-line bottom" />
        </div>

        {/* 底部制作信息 */}
        <div className="epilogue-credits">
          <RevealText delay={0.2} isVisible={isVisible} className="credit-line">
            A MONETWL PROJECT
          </RevealText>
          <RevealText delay={0.3} isVisible={isVisible} className="credit-line">
            Photography & Editorial Design
          </RevealText>
          <RevealText delay={0.4} isVisible={isVisible} className="credit-line">
            MMXXVI
          </RevealText>
        </div>

        {/* 章节索引导航 */}
        <nav className="chapter-index">
          {chapters.map((chapter) => (
            <button
              key={chapter.index}
              className={`chapter-item ${currentIndex === chapter.index ? 'active' : ''}`}
              onClick={() => handleNavigate(chapter.index)}
            >
              <span className="chapter-label">{chapter.label}</span>
              <span className="chapter-dot" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
