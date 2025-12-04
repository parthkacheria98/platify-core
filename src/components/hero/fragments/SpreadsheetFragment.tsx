import React from "react";

interface SpreadsheetFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SpreadsheetFragment: React.FC<SpreadsheetFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-3 rounded-xl bg-gradient-to-br from-[hsl(142,60%,45%)]/20 to-[hsl(142,60%,35%)]/10 backdrop-blur-sm border border-[hsl(142,60%,45%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="grid grid-cols-4 gap-1 mb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-[hsl(142,60%,45%)]/30 rounded text-[0.5rem] text-center"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded ${
              i % 4 === 0 || i % 4 === 1
                ? "bg-[hsl(142,60%,45%)]/15"
                : "bg-[hsl(142,60%,45%)]/10"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

