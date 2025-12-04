import React from "react";

interface NotificationFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const NotificationFragment: React.FC<NotificationFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(4,80%,58%)]/20 to-[hsl(4,80%,48%)]/10 backdrop-blur-sm border border-[hsl(4,80%,58%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[hsl(4,80%,58%)]"></div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2 bg-[hsl(4,80%,58%)]/30 rounded w-full"></div>
          <div className="h-2 bg-[hsl(4,80%,58%)]/20 rounded w-4/5"></div>
          <div className="h-2 bg-[hsl(4,80%,58%)]/20 rounded w-3/5"></div>
        </div>
      </div>
    </div>
  );
};

