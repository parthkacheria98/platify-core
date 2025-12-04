import React from "react";

interface TaskFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const TaskFragment: React.FC<TaskFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(220,10%,45%)]/20 to-[hsl(220,10%,35%)]/10 backdrop-blur-sm border border-[hsl(220,10%,45%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-4 h-4 rounded border-2 border-[hsl(220,10%,45%)]/40 mt-0.5"></div>
        <div className="flex-1 space-y-2">
          <div className="h-2 bg-[hsl(220,10%,45%)]/30 rounded w-full"></div>
          <div className="flex gap-2">
            <div className="px-2 py-0.5 rounded text-xs bg-[hsl(210,90%,55%)]/20 text-[hsl(210,90%,55%)] border border-[hsl(210,90%,55%)]/30">
              In Progress
            </div>
            <div className="px-2 py-0.5 rounded text-xs bg-[hsl(25,95%,55%)]/20 text-[hsl(25,95%,55%)] border border-[hsl(25,95%,55%)]/30">
              High
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1.5 mt-2">
        <div className="h-1.5 bg-[hsl(220,10%,45%)]/15 rounded"></div>
        <div className="h-1.5 bg-[hsl(220,10%,45%)]/15 rounded w-4/5"></div>
      </div>
    </div>
  );
};

