import React from "react";

interface ListFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ListFragment: React.FC<ListFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(190,70%,50%)]/20 to-[hsl(190,70%,40%)]/10 backdrop-blur-sm border border-[hsl(190,70%,50%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-[hsl(190,70%,50%)]/40"></div>
            <div className="h-2 bg-[hsl(190,70%,50%)]/25 rounded flex-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

