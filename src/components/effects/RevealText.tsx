import type { RevealAnimationProps } from '../../types';

export function RevealText({
  children,
  delay = 0,
  isVisible,
  className = ''
}: RevealAnimationProps) {
  return (
    <div
      className={`reveal-item ${className} ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
