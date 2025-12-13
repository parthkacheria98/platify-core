import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlassCard } from "./GlassCard";
import { ImageFragment } from "./fragments/ImageFragment";
import {
  ChatFragment,
  EmailFragment,
  TaskFragment,
  CalendarFragment,
  SpreadsheetFragment,
  DatabaseFragment,
  NotificationFragment,
  ConnectorFragment,
  FormFragment,
  ListFragment,
} from "./fragments";

interface FragmentConfig {
  id: string;
  // For image-based fragments
  imagePath?: string;
  imageAlt?: string;
  // For component-based fragments (legacy)
  component?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  mobilePosition?: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  delay: number;
  animation: "float-slow" | "float-medium" | "float-fast";
  layer: "foreground" | "midground" | "background";
  hideOnMobile?: boolean;
  size?: string; // Custom Tailwind size classes (e.g., "w-48 md:w-64 lg:w-80")
}

const animationClasses = {
  "float-slow": "animate-float-slow",
  "float-medium": "animate-float-medium",
  "float-fast": "animate-float-fast",
} as const;

/**
 * Fragment Configuration
 * 
 * To use JPEG images instead of components:
 * 1. Upload JPEG files to /public/hero-fragments/
 * 2. Replace component with imagePath, for example:
 *    {
 *      id: "chat-1",
 *      imagePath: "/hero-fragments/chat.jpg",  // Add this
 *      imageAlt: "Chat tool fragment",         // Add this
 *      // component: ChatFragment,             // Remove this
 *      position: { ... },
 *      // ... rest of config stays the same
 *    }
 * 3. See /src/components/hero/fragmentImages.config.ts for full image-based examples
 * 4. See /public/hero-fragments/README.md for detailed instructions
 */
const fragments: FragmentConfig[] = [
  {
    id: "chat-1",
    component: ChatFragment,
    position: { top: "10%", left: "5%" },
    mobilePosition: { top: "5%", left: "50%", right: "auto" },
    rotation: -5,
    delay: 0,
    animation: "float-slow",
    layer: "foreground",
  },
  {
    id: "calendar-1",
    imagePath: "/hero-fragments/slack1.png",
    imageAlt: "Slack fragment",
    size: "w-[280px] md:w-[280px] lg:w-[350px]", // Reduced to ~50% of original (569px)
    position: { top: "10%", left: "8%", right: "auto" },
    mobilePosition: { top: "5%", left: "10%" },
    rotation: 3,
    delay: 0.2,
    animation: "float-medium",
    layer: "midground",
  },
  {
    id: "api-how",
    imagePath: "/hero-fragments/api how.png",
    imageAlt: "API how fragment",
    size: "w-[340px] md:w-[340px] lg:w-[425px]", // Reduced to ~50% of original (684px)
    position: { top: "12%", right: "10%", left: "auto" },
    mobilePosition: { top: "8%", right: "5%" },
    rotation: -4,
    delay: 0.3,
    animation: "float-fast",
    layer: "foreground",
  },
  {
    id: "notification-1",
    component: NotificationFragment,
    position: { top: "12%", right: "8%" },
    mobilePosition: { top: "8%", right: "5%" },
    rotation: -4,
    delay: 0.4,
    animation: "float-fast",
    layer: "foreground",
  },
  {
    id: "trello",
    imagePath: "/hero-fragments/trello.png",
    imageAlt: "Trello fragment",
    size: "w-[535px] md:w-[535px] lg:w-[670px]", // Reduced to ~50% of original (1070px)
    position: { top: "55%", left: "5%", right: "auto" },
    mobilePosition: { bottom: "30%", left: "5%" },
    rotation: 5,
    delay: 0.5,
    animation: "float-slow",
    layer: "midground",
  },
  {
    id: "task-1",
    component: TaskFragment,
    position: { top: "50%", right: "12%" },
    mobilePosition: { bottom: "25%", right: "5%" },
    rotation: 5,
    delay: 0.6,
    animation: "float-slow",
    layer: "midground",
  },
  {
    id: "zap",
    imagePath: "/hero-fragments/zap.png",
    imageAlt: "Zap fragment",
    size: "w-[410px] md:w-[410px] lg:w-[515px]", // Reduced to ~50% of original (827px)
    position: { bottom: "20%", right: "8%", left: "auto" },
    mobilePosition: { bottom: "18%", right: "8%" },
    rotation: -3,
    delay: 0.7,
    animation: "float-medium",
    layer: "foreground",
  },
  {
    id: "form-1",
    component: FormFragment,
    position: { bottom: "15%", right: "10%" },
    mobilePosition: { bottom: "15%", right: "10%" },
    rotation: -3,
    delay: 0.8,
    animation: "float-medium",
    layer: "foreground",
  },
  {
    id: "notification-2",
    component: NotificationFragment,
    position: { bottom: "20%", right: "50%", left: "auto" },
    mobilePosition: { bottom: "10%", right: "10%" },
    rotation: 4,
    delay: 1,
    animation: "float-fast",
    layer: "background",
  },
  {
    id: "upload-attachments",
    imagePath: "/hero-fragments/upload attachments post mail.png",
    imageAlt: "Upload attachments fragment",
    size: "w-[440px] md:w-[440px] lg:w-[550px]", // Reduced to ~50% of original (882px)
    position: { top: "38%", left: "50%", right: "auto" },
    mobilePosition: { top: "30%", left: "50%", right: "auto" },
    rotation: -5,
    delay: 1.1,
    animation: "float-medium",
    layer: "midground",
  },
  {
    id: "connector-1",
    component: ConnectorFragment,
    position: { bottom: "25%", left: "8%" },
    mobilePosition: { bottom: "5%", left: "5%" },
    rotation: -6,
    delay: 1.2,
    animation: "float-slow",
    layer: "midground",
  },
  {
    id: "list-1",
    component: ListFragment,
    position: { bottom: "10%", left: "12%" },
    mobilePosition: { bottom: "12%", left: "10%" },
    rotation: 2,
    delay: 1.4,
    animation: "float-medium",
    layer: "background",
  },
  {
    id: "spreadsheet-1",
    component: SpreadsheetFragment,
    position: { top: "45%", left: "6%" },
    mobilePosition: { top: "50%", left: "5%" },
    rotation: -2,
    delay: 1.5,
    animation: "float-fast",
    layer: "midground",
  },
  {
    id: "task-2",
    component: TaskFragment,
    position: { top: "35%", left: "15%" },
    mobilePosition: { top: "30%", left: "10%" },
    rotation: 3,
    delay: 1.8,
    animation: "float-slow",
    layer: "background",
  },
  {
    id: "email-1",
    component: EmailFragment,
    position: { top: "25%", right: "15%" },
    mobilePosition: { top: "20%", right: "8%" },
    rotation: -4,
    delay: 2,
    animation: "float-medium",
    layer: "background",
    hideOnMobile: true,
  },
  {
    id: "database-1",
    component: DatabaseFragment,
    position: { bottom: "30%", left: "50%", right: "auto" },
    mobilePosition: { bottom: "20%", left: "50%", right: "auto" },
    rotation: 5,
    delay: 2.2,
    animation: "float-fast",
    layer: "background",
    hideOnMobile: true,
  },
];

const layerStyles = {
  foreground: {
    zIndex: 30,
    blur: 0.5,
    scale: 1.05,
    opacity: 0.9,
    parallax: 1.5,
  },
  midground: {
    zIndex: 20,
    blur: 0,
    scale: 1,
    opacity: 0.85,
    parallax: 1,
  },
  background: {
    zIndex: 10,
    blur: 1,
    scale: 0.9,
    opacity: 0.5,
    parallax: 0.5,
  },
};

export const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isMobile) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;

      setMousePosition({ x, y });
      setIsHovering(true);
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  const visibleFragments = fragments.filter(
    (fragment) => !isMobile || !fragment.hideOnMobile
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 md:py-32 px-6 lg:px-12 border-t border-border/50 overflow-hidden min-h-[600px] md:min-h-[800px]"
      // style={{
      //   background: "hsl(220 20% 8%)",
      // }}
    >
      {/* Ambient glow effects */}
      <div
        className="absolute top-0 left-0 w-96 h-96 blur-3xl opacity-[0.05] pointer-events-none"
        style={{
          background: "hsl(263, 70%, 58%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 blur-3xl opacity-[0.05] pointer-events-none"
        style={{
          background: "hsl(210, 90%, 55%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-3xl opacity-[0.03] pointer-events-none"
        style={{
          background: "hsl(var(--primary))",
        }}
      />

      {/* Fragments */}
      {visibleFragments.map((fragment) => {
        const layer = layerStyles[fragment.layer];
        const position = isMobile && fragment.mobilePosition
          ? fragment.mobilePosition
          : fragment.position;

        // Calculate parallax offset - reduced intensity for smoother animation
        const parallaxX = isHovering && !isMobile
          ? mousePosition.x * layer.parallax * 15
          : 0;
        const parallaxY = isHovering && !isMobile
          ? mousePosition.y * layer.parallax * 15
          : 0;

        return (
          <div
            key={fragment.id}
            className="absolute pointer-events-none"
            style={{
              ...position,
              zIndex: layer.zIndex,
              filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
              opacity: layer.opacity,
              // Remove transition from here to avoid animation conflicts
            }}
          >
            {/* Parallax wrapper - separate from animation */}
            <div
              style={{
                transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
                transition: "transform 0.15s ease-out",
                willChange: "transform",
              }}
            >
              {/* Rotation and scale wrapper */}
              <div
                style={{
                  transform: `rotate(${fragment.rotation}deg) scale(${layer.scale})`,
                  willChange: "transform",
                }}
              >
                {/* Animation wrapper */}
                <div
                  className={animationClasses[fragment.animation]}
                  style={{
                    animationDelay: `${fragment.delay}s`,
                    willChange: "transform",
                  }}
                >
                {fragment.imagePath ? (
                  <ImageFragment
                    src={fragment.imagePath}
                    alt={fragment.imageAlt || fragment.id}
                    className={fragment.size || "w-32 md:w-40 lg:w-48"}
                  />
                ) : fragment.component ? (
                  <fragment.component
                    className={fragment.size || "w-32 md:w-40 lg:w-48"}
                  />
                ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Center Glass Card */}
      <div className="relative z-40 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
        <GlassCard />
      </div>
    </section>
  );
};

