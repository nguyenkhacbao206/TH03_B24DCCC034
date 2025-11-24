import React from "react";

interface Props {
  current: number;
  totalPages: number;
  onPage: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ current, totalPages, onPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
      <button onClick={() => onPage(Math.max(1, current - 1))} disabled={current === 1}>
        Previous
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onPage(p)} style={{ fontWeight: p === current ? "bold" as const : "normal" as const }}>
          {p}
        </button>
      ))}
      <button onClick={() => onPage(Math.min(totalPages, current + 1))} disabled={current === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
