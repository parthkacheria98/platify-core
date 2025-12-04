/**
 * Fragment Image Configuration
 * 
 * To use JPEG images instead of UI components:
 * 1. Upload your JPEG files to /public/hero-fragments/
 * 2. Update the imagePath below to match your filename
 * 3. The system will automatically use images when imagePath is provided
 * 
 * Image paths are relative to /public/, so "/hero-fragments/filename.jpg" 
 * will load from /public/hero-fragments/filename.jpg
 */

export interface FragmentImageConfig {
  id: string;
  imagePath: string;
  imageAlt: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  mobilePosition?: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  delay: number;
  animation: "float-slow" | "float-medium" | "float-fast";
  layer: "foreground" | "midground" | "background";
  hideOnMobile?: boolean;
}

/**
 * Example configuration using image paths.
 * Replace these with your actual image filenames.
 * 
 * To use images, import this config and merge it with your fragments array,
 * or replace the component-based fragments with image-based ones.
 */
export const fragmentImageConfig: FragmentImageConfig[] = [
  {
    id: "chat-1",
    imagePath: "/hero-fragments/chat.jpg",
    imageAlt: "Chat tool fragment",
    position: { top: "10%", left: "5%" },
    mobilePosition: { top: "5%", left: "50%", right: "auto" },
    rotation: -5,
    delay: 0,
    animation: "float-slow",
    layer: "foreground",
  },
  {
    id: "calendar-1",
    imagePath: "/hero-fragments/calendar.jpg",
    imageAlt: "Calendar tool fragment",
    position: { top: "8%", left: "50%", right: "auto" },
    mobilePosition: { top: "3%", left: "10%" },
    rotation: 3,
    delay: 0.2,
    animation: "float-medium",
    layer: "midground",
  },
  {
    id: "notification-1",
    imagePath: "/hero-fragments/notification.jpg",
    imageAlt: "Notification tool fragment",
    position: { top: "12%", right: "8%" },
    mobilePosition: { top: "8%", right: "5%" },
    rotation: -4,
    delay: 0.4,
    animation: "float-fast",
    layer: "foreground",
  },
  {
    id: "task-1",
    imagePath: "/hero-fragments/task.jpg",
    imageAlt: "Task tool fragment",
    position: { top: "50%", right: "12%" },
    mobilePosition: { bottom: "25%", right: "5%" },
    rotation: 5,
    delay: 0.6,
    animation: "float-slow",
    layer: "midground",
  },
  {
    id: "form-1",
    imagePath: "/hero-fragments/form.jpg",
    imageAlt: "Form tool fragment",
    position: { bottom: "15%", right: "10%" },
    mobilePosition: { bottom: "15%", right: "10%" },
    rotation: -3,
    delay: 0.8,
    animation: "float-medium",
    layer: "foreground",
  },
  {
    id: "notification-2",
    imagePath: "/hero-fragments/notification-2.jpg",
    imageAlt: "Notification tool fragment",
    position: { bottom: "20%", right: "50%", left: "auto" },
    mobilePosition: { bottom: "10%", right: "10%" },
    rotation: 4,
    delay: 1,
    animation: "float-fast",
    layer: "background",
  },
  {
    id: "connector-1",
    imagePath: "/hero-fragments/connector.jpg",
    imageAlt: "Connector tool fragment",
    position: { bottom: "25%", left: "8%" },
    mobilePosition: { bottom: "5%", left: "5%" },
    rotation: -6,
    delay: 1.2,
    animation: "float-slow",
    layer: "midground",
  },
  {
    id: "list-1",
    imagePath: "/hero-fragments/list.jpg",
    imageAlt: "List tool fragment",
    position: { bottom: "10%", left: "12%" },
    mobilePosition: { bottom: "12%", left: "10%" },
    rotation: 2,
    delay: 1.4,
    animation: "float-medium",
    layer: "background",
  },
  {
    id: "spreadsheet-1",
    imagePath: "/hero-fragments/spreadsheet.jpg",
    imageAlt: "Spreadsheet tool fragment",
    position: { top: "45%", left: "6%" },
    mobilePosition: { top: "50%", left: "5%" },
    rotation: -2,
    delay: 1.6,
    animation: "float-fast",
    layer: "midground",
  },
  {
    id: "task-2",
    imagePath: "/hero-fragments/task-2.jpg",
    imageAlt: "Task tool fragment",
    position: { top: "35%", left: "15%" },
    mobilePosition: { top: "30%", left: "10%" },
    rotation: 3,
    delay: 1.8,
    animation: "float-slow",
    layer: "background",
  },
  {
    id: "email-1",
    imagePath: "/hero-fragments/email.jpg",
    imageAlt: "Email tool fragment",
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
    imagePath: "/hero-fragments/database.jpg",
    imageAlt: "Database tool fragment",
    position: { bottom: "30%", left: "50%", right: "auto" },
    mobilePosition: { bottom: "20%", left: "50%", right: "auto" },
    rotation: 5,
    delay: 2.2,
    animation: "float-fast",
    layer: "background",
    hideOnMobile: true,
  },
];

/**
 * Helper function to convert image config to fragment config format
 * Compatible with HeroSection's FragmentConfig interface
 */
export function createFragmentFromImageConfig(config: FragmentImageConfig) {
  return {
    id: config.id,
    imagePath: config.imagePath,
    imageAlt: config.imageAlt,
    position: config.position,
    mobilePosition: config.mobilePosition,
    rotation: config.rotation,
    delay: config.delay,
    animation: config.animation,
    layer: config.layer,
    hideOnMobile: config.hideOnMobile,
  };
}

