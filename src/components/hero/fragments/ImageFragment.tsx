import React, { useState } from "react";

interface ImageFragmentProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Efficient image fragment component with lazy loading and error handling.
 * Optimized for performance with proper loading states.
 */
export const ImageFragment: React.FC<ImageFragmentProps> = ({ 
  src, 
  alt, 
  className = "", 
  style 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error - show placeholder if image fails to load
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } w-full h-auto object-contain`}
          style={{
            ...style,
            // Ensure images maintain aspect ratio and don't overflow
            maxWidth: "100%",
            height: "auto",
          }}
        />
      ) : (
        // Fallback placeholder if image fails to load
        <div className="w-full h-32 bg-muted/20 rounded-xl border border-border/20 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Image not found</span>
        </div>
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted/10 rounded-xl animate-pulse" />
      )}
    </div>
  );
};

