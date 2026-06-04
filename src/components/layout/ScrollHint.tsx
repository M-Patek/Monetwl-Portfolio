interface Props {
  hidden: boolean;
}

export function ScrollHint({ hidden }: Props) {
  return (
    <div className={`scroll-hint ${hidden ? 'hidden' : ''}`}>
      <div className="scroll-arrow">
        <span>Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </div>
  );
}
