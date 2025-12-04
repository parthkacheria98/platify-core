import React from "react";

interface FormFragmentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormFragment: React.FC<FormFragmentProps> = ({ className = "", style }) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-gradient-to-br from-[hsl(280,60%,55%)]/20 to-[hsl(280,60%,45%)]/10 backdrop-blur-sm border border-[hsl(280,60%,55%)]/20 shadow-lg ${className}`}
      style={style}
    >
      <div className="space-y-3">
        <div>
          <div className="text-xs text-[hsl(280,60%,55%)]/60 mb-1.5">Name</div>
          <div className="h-6 bg-[hsl(280,60%,55%)]/15 rounded border border-[hsl(280,60%,55%)]/20"></div>
        </div>
        <div>
          <div className="text-xs text-[hsl(280,60%,55%)]/60 mb-1.5">Email</div>
          <div className="h-6 bg-[hsl(280,60%,55%)]/15 rounded border border-[hsl(280,60%,55%)]/20"></div>
        </div>
      </div>
    </div>
  );
};

