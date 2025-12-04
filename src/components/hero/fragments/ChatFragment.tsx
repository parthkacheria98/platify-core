import React from "react";

interface ChatFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ChatFragment: React.FC<ChatFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(263,70%,58%)]/20 to-[hsl(263,70%,48%)]/10 backdrop-blur-sm border border-[hsl(263,70%,58%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[hsl(263,70%,58%)]/30"></div>
        <div className="flex-1 space-y-1">
          <div className="h-2 bg-[hsl(263,70%,58%)]/30 rounded w-3/4"></div>
          <div className="h-2 bg-[hsl(263,70%,58%)]/20 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-[hsl(263,70%,58%)]/20 rounded"></div>
        <div className="h-2 bg-[hsl(263,70%,58%)]/20 rounded w-4/5"></div>
      </div>
      <div className="absolute top-2 right-2 text-xs text-[hsl(263,70%,58%)]/60">2m</div>
    </div>
  );
};

