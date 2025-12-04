import React from "react";

interface ConnectorFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ConnectorFragment: React.FC<ConnectorFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(25,95%,55%)]/20 to-[hsl(25,95%,45%)]/10 backdrop-blur-sm border border-[hsl(25,95%,55%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-6 h-6 rounded-full bg-[hsl(25,95%,55%)]/30 border-2 border-[hsl(25,95%,55%)]/50"></div>
        <div className="h-0.5 w-4 bg-[hsl(25,95%,55%)]/30"></div>
        <div className="w-6 h-6 rounded bg-[hsl(25,95%,55%)]/30 border-2 border-[hsl(25,95%,55%)]/50"></div>
      </div>
      <div className="text-xs text-center text-[hsl(25,95%,55%)]/70">• Syncing...</div>
    </div>
  );
};

