import React from "react";

interface DatabaseFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const DatabaseFragment: React.FC<DatabaseFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(190,70%,50%)]/20 to-[hsl(190,70%,40%)]/10 backdrop-blur-sm border border-[hsl(190,70%,50%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(190,70%,50%)]/40"></div>
          <div className="h-2 bg-[hsl(190,70%,50%)]/30 rounded flex-1"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(190,70%,50%)]/40"></div>
          <div className="h-2 bg-[hsl(190,70%,50%)]/30 rounded flex-1"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(190,70%,50%)]/40"></div>
          <div className="h-2 bg-[hsl(190,70%,50%)]/30 rounded w-3/4"></div>
        </div>
      </div>
      <div className="absolute top-2 right-2 text-xs text-[hsl(190,70%,50%)]/60">3 tables</div>
    </div>
  );
};

