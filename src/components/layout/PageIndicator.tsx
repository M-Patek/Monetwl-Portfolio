interface Props {
  current: number;
  total: number;
  accentColor: string;
}

export function PageIndicator({ current, total, accentColor }: Props) {
  return (
    <div className="page-indicator">
      <span className="current-page">0{current}</span>
      <span className="page-divider" style={{ backgroundColor: accentColor }} />
      <span className="total-pages">0{total}</span>
    </div>
  );
}
