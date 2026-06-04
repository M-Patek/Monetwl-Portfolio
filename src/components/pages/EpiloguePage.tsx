interface Props {
  isVisible: boolean;
  isRevealed: boolean;
}

export function EpiloguePage({ isRevealed }: Props) {
  return (
    <section data-index={4} className="poster-section epilogue is-visible">
      <div className="epilogue-gradient" />
      <div className="grain-overlay" />

      {/* 左侧竖条装饰 - 随滚动展开 */}
      <div className={`epilogue-accent ${isRevealed ? 'revealed' : ''}`} />

      <div className="content-layer epilogue-layer">
        {/* 主品牌 - 从左到右分层显现 */}
        <div className={`epilogue-hero ${isRevealed ? 'revealed' : ''}`}>
          <h1 className="hero-text">
            <span className="char">M</span>
            <span className="char">O</span>
            <span className="char">N</span>
            <span className="char">E</span>
            <span className="char">T</span>
            <span className="char">W</span>
            <span className="char">L</span>
          </h1>
        </div>

        {/* 引用文字 */}
        <div className={`epilogue-quote ${isRevealed ? 'revealed' : ''}`}>
          <p className="quote-line">Design is thinking made visual</p>
          <p className="quote-author">— Saul Bass</p>
        </div>

        {/* 底部信息 */}
        <div className={`epilogue-footer ${isRevealed ? 'revealed' : ''}`}>
          <div className="footer-line" />
          <p className="footer-text">Thank you for viewing</p>
        </div>
      </div>

      {/* 右侧年份 */}
      <div className={`epilogue-year ${isRevealed ? 'revealed' : ''}`}>
        <span>MMXXVI</span>
      </div>
    </section>
  );
}
