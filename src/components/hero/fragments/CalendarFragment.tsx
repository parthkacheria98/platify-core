import React from "react";

interface CalendarFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CalendarFragment: React.FC<CalendarFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(210,90%,55%)]/20 to-[hsl(210,90%,45%)]/10 backdrop-blur-sm border border-[hsl(210,90%,55%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="mb-2">
        <div className="text-xs font-medium text-[hsl(210,90%,55%)]/80 mb-2">December</div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 text-[0.6rem] text-center text-[hsl(210,90%,55%)]/50"></div>
          ))}
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded text-[0.6rem] text-center ${
                i === 5 || i === 12 || i === 18
                  ? "bg-[hsl(210,90%,55%)]/30 border border-[hsl(210,90%,55%)]/50"
                  : "bg-[hsl(210,90%,55%)]/10"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

