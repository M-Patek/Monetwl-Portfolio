import { useEffect, useRef, useState, useCallback } from 'react';
import './PresentationPage.css';

// ============================================
// Apple Glassmorphism Presentation
// Melissa Dell - The Persistent Effects of Peru's Mining Mita
// ============================================

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return { ref, isVisible };
}

// Glass Card Component
function GlassCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`glass-card ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Reveal Text Component
function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-text ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Progress Bar
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 8;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(prog);

      const sections = document.querySelectorAll('[data-section]');
      let current = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = index;
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top progress line */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Section indicator */}
      <div className="section-indicator">
        <span className="section-current">{String(currentSection + 1).padStart(2, '0')}</span>
        <div className="section-divider" />
        <span className="section-total">{String(totalSections).padStart(2, '0')}</span>
      </div>

      {/* Navigation dots */}
      <div className="nav-dots">
        {Array.from({ length: totalSections }).map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentSection ? 'active' : ''}`}
            onClick={() => {
              const section = document.querySelector(`[data-section="${i}"]`);
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

// ============================================
// SECTION COMPONENTS
// ============================================

function TitleSection() {
  return (
    <section className="presentation-section title-section" data-section="0">
      {/* Ambient glow */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      {/* Corner decorations */}
      <div className="glass-corner top-left">
        <span>Econometrica</span>
        <span>Vol. 78 No. 6</span>
      </div>
      <div className="glass-corner top-right">
        <span>Melissa Dell</span>
        <span>2010</span>
      </div>
      <div className="glass-corner bottom-left">
        <span>Harvard University</span>
      </div>
      <div className="glass-corner bottom-right">
        <span>Development Economics</span>
      </div>

      <div className="section-content center">
        <RevealText delay={0.1}>
          <div className="glass-label">Econometrica · 2010</div>
        </RevealText>
        <RevealText delay={0.25}>
          <h1 className="glass-title">The Persistent Effects</h1>
        </RevealText>
        <RevealText delay={0.4}>
          <h1 className="glass-title">of Peru's Mining Mita</h1>
        </RevealText>
        <RevealText delay={0.55}>
          <div className="glass-line" />
        </RevealText>
        <RevealText delay={0.7}>
          <p className="glass-subtitle">
            一条四百年前的线，至今仍在诉说制度的路径依赖
          </p>
        </RevealText>
        <RevealText delay={0.9}>
          <div className="author-glass">
            <div className="author-avatar">M</div>
            <div className="author-info">
              <div className="author-name">Melissa Dell</div>
              <div className="author-meta">Econometrica, Vol. 78, No. 6, pp. 1863–1903</div>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

function HookSection() {
  return (
    <section className="presentation-section hook-section" data-section="1">
      <div className="ambient-glow ambient-glow-warm" />

      <div className="glass-corner top-left">
        <span>01</span>
        <span>Introduction</span>
      </div>
      <div className="glass-corner top-right">
        <span>1573 – 1812</span>
      </div>

      <div className="section-content">
        <div className="hook-layout">
          <div className="hook-visual">
            <GlassCard className="timeline-card">
              <div className="timeline">
                <div className="timeline-point" />
                <div className="timeline-point" />
                <div className="timeline-point" />
                <div className="timeline-label" style={{ top: '-4px' }}>1573 · 米塔开始</div>
                <div className="timeline-label" style={{ top: '50%', transform: 'translateY(-50%)' }}>1812 · 制度废除</div>
                <div className="timeline-label" style={{ bottom: '-4px' }}>2001 · 当代调查</div>
              </div>
            </GlassCard>
          </div>

          <div className="hook-text">
            <RevealText>
              <div className="glass-label">一条线，四百年</div>
            </RevealText>
            <RevealText delay={0.15}>
              <h2 className="glass-h1">历史的幽灵</h2>
            </RevealText>
            <RevealText delay={0.3}>
              <p className="glass-body">
                1573年，西班牙殖民者在秘鲁高原划定了一条线。线以东的社区被迫向波托西银矿输送劳动力——这就是<span className="glass-highlight">"米塔"（Mita）</span>强制劳役制度。
              </p>
            </RevealText>
            <RevealText delay={0.45}>
              <p className="glass-body">
                四百多年后的今天，这条线两侧的秘鲁家庭：
              </p>
            </RevealText>
            <RevealText delay={0.6}>
              <span className="glass-display">-25%</span>
            </RevealText>
            <RevealText delay={0.75}>
              <p className="glass-body">
                消费水平仍然相差约<span className="glass-highlight">25%</span>。
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundSection() {
  const cards = [
    { num: 'I', title: '制度内容', body: '1573–1812年，约200个印第安社区每年输送7%的成年男性劳动力到波托西银矿和万卡韦利卡汞矿。' },
    { num: 'II', title: '关键事实', body: '边界划定不是基于经济考量，而是行政管理的便利。这意味着边界两侧在制度实施前是相似的。' },
    { num: 'III', title: '直接影响', body: '强制抽走劳动力，改变土地所有权结构——受影响社区难以发展大庄园经济。' },
    { num: 'IV', title: '计量问题', body: '处理组不是随机分配的。如何解决这个经典的内生性问题？' },
  ];

  return (
    <section className="presentation-section background-section" data-section="2">
      <div className="ambient-glow ambient-glow-cool" />

      <div className="glass-corner top-left">
        <span>02</span>
        <span>Background</span>
      </div>

      <div className="section-content">
        <div className="section-header center">
          <RevealText>
            <div className="glass-label">历史背景</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">为什么是自然实验？</h2>
          </RevealText>
        </div>

        <div className="cards-grid">
          {cards.map((card, i) => (
            <GlassCard key={card.num} delay={i * 0.12} className="info-card">
              <div className="card-num">{card.num}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-body">{card.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function RDDSection() {
  return (
    <section className="presentation-section rdd-section" data-section="3">
      <div className="ambient-glow ambient-glow-warm" />

      <div className="glass-corner top-left">
        <span>03</span>
        <span>Identification</span>
      </div>

      <div className="section-content">
        <div className="section-header center">
          <RevealText>
            <div className="glass-label">识别策略</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">地理断点回归：RDD</h2>
          </RevealText>
        </div>

        <GlassCard delay={0.25} className="chart-card">
          <div className="rdd-chart">
            <div className="rdd-axis-x" />
            <div className="rdd-axis-y" />
            <div className="rdd-cutoff" />
            <div className="rdd-line-left" />
            <div className="rdd-line-right" />
            <div className="rdd-jump" />
            {/* Scatter points */}
            {[
              { l: '14%', b: '26%' }, { l: '19%', b: '30%' }, { l: '24%', b: '28%' },
              { l: '29%', b: '32%' }, { l: '34%', b: '34%' }, { l: '39%', b: '36%' },
              { l: '44%', b: '38%' }, { l: '55%', b: '50%' }, { l: '60%', b: '53%' },
              { l: '65%', b: '56%' }, { l: '70%', b: '58%' }, { l: '75%', b: '61%' },
              { l: '80%', b: '59%' }, { l: '85%', b: '63%' },
            ].map((p, i) => (
              <div key={i} className="rdd-dot" style={{ left: p.l, bottom: p.b }} />
            ))}
            <div className="rdd-tag" style={{ left: '18%', bottom: '5%' }}>受米塔影响</div>
            <div className="rdd-tag" style={{ right: '18%', bottom: '5%' }}>不受影响</div>
            <div className="rdd-tag" style={{ left: '50%', bottom: '5%', transform: 'translateX(-50%)', color: 'var(--glass-accent)' }}>边界</div>
            <div className="rdd-tag" style={{ left: '3%', top: '10%' }}>Y</div>
            <div className="rdd-tag" style={{ right: '5%', bottom: '10%' }}>X</div>
          </div>
        </GlassCard>

        <RevealText delay={0.4}>
          <p className="glass-body center-text" style={{ maxWidth: '640px', margin: '2rem auto 0' }}>
            <span className="glass-highlight">核心直觉</span>：边界两侧一公里内的村庄，除了米塔制度外应该差不多。结果变量在边界处的<span className="glass-highlight">跳跃</span>，就是米塔的因果效应。
          </p>
        </RevealText>

        <RevealText delay={0.55}>
          <div className="formula-glass">
            <span className="formula-text">τ = lim(x→c⁺) E[Y|X=x] − lim(x→c⁻) E[Y|X=x]</span>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

function ResultsSection() {
  const results = [
    { value: '-25%', label: '消费差距', desc: '家庭消费水平' },
    { value: '+6', unit: 'pp', label: '儿童发育迟缓率', desc: 'pp 增加' },
    { value: '↓', label: '大地块比例', desc: '土地所有权结构' },
    { value: '↓', label: '中学完成率', desc: '人力资本积累' },
  ];

  return (
    <section className="presentation-section results-section" data-section="4">
      <div className="ambient-glow ambient-glow-cool" />

      <div className="glass-corner top-left">
        <span>04</span>
        <span>Results</span>
      </div>

      <div className="section-content">
        <div className="section-header center">
          <RevealText>
            <div className="glass-label">核心结果</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">四百年的制度遗产</h2>
          </RevealText>
        </div>

        <div className="results-grid">
          {results.map((r, i) => (
            <GlassCard key={i} delay={i * 0.12} className="result-card">
              <span className="result-value">{r.value}</span>
              {r.unit && <span className="result-unit">{r.unit}</span>}
              <div className="result-label">{r.label}</div>
              <div className="result-desc">{r.desc}</div>
            </GlassCard>
          ))}
        </div>

        <RevealText delay={0.5}>
          <p className="glass-body center-text" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
            这些结果共同指向一个结论：米塔制度通过某种机制，产生了<span className="glass-highlight">持久的路径依赖</span>。
          </p>
        </RevealText>
      </div>
    </section>
  );
}

function MechanismSection() {
  const steps = [
    { title: '米塔制度', desc: '强制劳动力抽取' },
    { title: '土地结构', desc: '大庄园难以发展\n小农经济锁定' },
    { title: '规模经济', desc: '土地碎片化\n无法规模经营' },
    { title: '贫困陷阱', desc: '公共品不足\n社会资本匮乏' },
  ];

  return (
    <section className="presentation-section mechanism-section" data-section="5">
      <div className="ambient-glow ambient-glow-warm" />

      <div className="glass-corner top-left">
        <span>05</span>
        <span>Mechanism</span>
      </div>

      <div className="section-content">
        <div className="section-header center">
          <RevealText>
            <div className="glass-label">机制分析</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">不是劳役本身，是制度锁定</h2>
          </RevealText>
        </div>

        <div className="mechanism-flow">
          {steps.map((step, i) => (
            <div key={i} className="mechanism-item">
              <GlassCard delay={i * 0.15} className={`mechanism-card ${i === 0 ? 'primary' : ''}`}>
                <h3 className="mechanism-title">{step.title}</h3>
                <p className="mechanism-desc">{step.desc}</p>
              </GlassCard>
              {i < steps.length - 1 && (
                <div className="mechanism-arrow">→</div>
              )}
            </div>
          ))}
        </div>

        <RevealText delay={0.6}>
          <p className="glass-body center-text" style={{ maxWidth: '640px', margin: '2rem auto 0' }}>
            土地所有权结构是核心传导渠道。但RDD识别的是总效应，具体哪个机制占主导，还需要更多证据。
          </p>
        </RevealText>
      </div>
    </section>
  );
}

function LimitationsSection() {
  const items = [
    { num: 'I', title: '局部平均处理效应（LATE）', body: 'RDD识别的是边界附近的效应，不能推广到远离边界的样本。"走得近"意味着"看得窄"。' },
    { num: 'II', title: '外部有效性', body: '波托西银矿的特定背景、秘鲁高原的地理特征，使结果推广到其他情境需要谨慎。' },
    { num: 'III', title: '机制识别', body: '土地结构、文化、社会资本等机制难以完全分离。RDD识别总效应，具体渠道仍需更多证据。' },
  ];

  return (
    <section className="presentation-section limitations-section" data-section="6">
      <div className="ambient-glow ambient-glow-cool" />

      <div className="glass-corner top-left">
        <span>06</span>
        <span>Limitations</span>
      </div>

      <div className="section-content">
        <div className="section-header center">
          <RevealText>
            <div className="glass-label">局限与讨论</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">任何研究都有局限</h2>
          </RevealText>
        </div>

        <div className="limitations-list">
          {items.map((item, i) => (
            <GlassCard key={item.num} delay={i * 0.15} className="limit-card">
              <div className="limit-num">{item.num}</div>
              <div className="limit-content">
                <h3 className="limit-title">{item.title}</h3>
                <p className="limit-body">{item.body}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConclusionSection() {
  return (
    <section className="presentation-section conclusion-section" data-section="7">
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      <div className="glass-corner top-left">
        <span>07</span>
        <span>Conclusion</span>
      </div>
      <div className="glass-corner top-right">
        <span>Thank You</span>
      </div>

      <div className="section-content center">
        <div className="section-header">
          <RevealText>
            <div className="glass-label">结语</div>
          </RevealText>
          <RevealText delay={0.15}>
            <h2 className="glass-h1">回到课程的核心主题</h2>
          </RevealText>
        </div>

        <RevealText delay={0.3}>
          <blockquote className="glass-quote">
            "好的识别策略不仅需要技术，<br />更需要对<span className="glass-highlight">历史和制度的深刻理解</span>。"
          </blockquote>
        </RevealText>

        <div className="takeaways-grid">
          <GlassCard delay={0.45} className="takeaway-card">
            <h3 className="takeaway-title">RDD</h3>
            <p className="takeaway-body">地理断点作为自然实验<br />识别制度的因果效应</p>
          </GlassCard>
          <GlassCard delay={0.6} className="takeaway-card">
            <h3 className="takeaway-title">IV</h3>
            <p className="takeaway-body">到边界的距离作为工具变量<br />断点处识别处理效应</p>
          </GlassCard>
          <GlassCard delay={0.75} className="takeaway-card">
            <h3 className="takeaway-title">→</h3>
            <p className="takeaway-body">与Acemoglu等人殊途同归<br />回答制度的内生性问题</p>
          </GlassCard>
        </div>

        <RevealText delay={0.9}>
          <p className="glass-closing">
            一条四百年前划定的线，至今仍在诉说制度的路径依赖。
          </p>
        </RevealText>
      </div>
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PresentationPage() {
  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const sections = document.querySelectorAll('[data-section]');
    const current = Array.from(sections).findIndex(s => {
      const rect = s.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    });

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (current < sections.length - 1) {
        sections[current + 1].scrollIntoView({ behavior: 'smooth' });
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      if (current > 0) {
        sections[current - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="presentation-container">
      <ProgressBar />

      <TitleSection />
      <HookSection />
      <BackgroundSection />
      <RDDSection />
      <ResultsSection />
      <MechanismSection />
      <LimitationsSection />
      <ConclusionSection />
    </div>
  );
}
