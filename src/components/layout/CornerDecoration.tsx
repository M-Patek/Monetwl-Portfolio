interface Props {
  showIssue?: boolean;
  issueNumber?: number;
}

export function CornerDecoration({ showIssue = false, issueNumber }: Props) {
  return (
    <>
      <div className="corner top-left">
        <span>Est.</span>
        <span>MMXXVI</span>
      </div>
      {showIssue && issueNumber && (
        <div className="corner bottom-right">
          <span>Issue</span>
          <span>No. 0{issueNumber}</span>
        </div>
      )}
    </>
  );
}
