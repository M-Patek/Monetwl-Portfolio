interface Props {
  progress: number;
  color: string;
}

export function ScrollProgress({ progress, color }: Props) {
  return (
    <div className="scroll-progress">
      <div
        className="progress-bar"
        style={{
          transform: `scaleY(${progress})`,
          background: `linear-gradient(to bottom, ${color}, ${color})`
        }}
      />
    </div>
  );
}
