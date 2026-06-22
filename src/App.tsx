import { useScrollProgress, useProgressColor, useDisplayPageIndex } from './hooks/useScrollProgress';
import { posters } from './data/posters';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { PageIndicator } from './components/layout/PageIndicator';
import { CornerDecoration } from './components/layout/CornerDecoration';
import { ScrollHint } from './components/layout/ScrollHint';
import { ProloguePage } from './components/pages/ProloguePage';
import { PosterPage } from './components/pages/PosterPage';
import { InterludePage } from './components/pages/InterludePage';
import { EpiloguePage } from './components/pages/EpiloguePage';

import './App.css';

function App() {
  const { progress, activeIndex, visibleSections, containerRef } = useScrollProgress(posters);
  const progressColor = useProgressColor(posters, progress);
  const displayPage = useDisplayPageIndex(activeIndex);
  const imagePosters = posters.filter(p => p.type === 'image');

  const getParallaxCSS = (index: number): React.CSSProperties & { [key: string]: string } => ({
    '--parallax-offset': `${(progress - index / posters.length) * 20}px`
  });

  return (
    <div
      ref={containerRef}
      className="parallax-container"
      style={{ backgroundColor: posters[activeIndex].theme.bg }}
    >
      <ScrollProgress progress={progress} color={progressColor} />
      <PageIndicator
        current={displayPage}
        total={imagePosters.length}
        accentColor={posters[activeIndex].theme.accent}
      />

      {/* 序页 */}
      <ProloguePage
        poster={posters[0] as any}
        isVisible={visibleSections.has(0)}
      />

      {/* DIURNE 海报页 */}
      <PosterPage
        poster={posters[1] as any}
        index={1}
        isVisible={visibleSections.has(1)}
        parallaxStyle={getParallaxCSS(1)}
      />
      <CornerDecoration showIssue issueNumber={1} />

      {/* 过渡页 */}
      <InterludePage
        poster={posters[2] as any}
        isVisible={visibleSections.has(2)}
      />

      {/* NOCTURNE 海报页 */}
      <PosterPage
        poster={posters[3] as any}
        index={3}
        isVisible={visibleSections.has(3)}
        parallaxStyle={getParallaxCSS(3)}
      />
      <CornerDecoration showIssue issueNumber={2} />

            {/* 尾页 */}
      <EpiloguePage
        isVisible={visibleSections.has(4)}
        isRevealed={progress > 0.85}
      />

      <ScrollHint hidden={progress > 0.05} />
    </div>
  );
}

export default App;
