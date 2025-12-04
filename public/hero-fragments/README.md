# Hero Fragment Images

## 📁 Directory Structure

Upload your JPEG fragment images to this directory (`/public/hero-fragments/`).

## 📝 How to Use

1. **Upload your JPEG files** to this directory with descriptive names, for example:
   - `chat.jpg`
   - `calendar.jpg`
   - `notification.jpg`
   - `task.jpg`
   - `form.jpg`
   - `connector.jpg`
   - `list.jpg`
   - `spreadsheet.jpg`
   - `email.jpg`
   - `database.jpg`

2. **Update the configuration** in `/src/components/hero/fragmentImages.config.ts`:
   - Set the `imagePath` to match your filename (e.g., `/hero-fragments/chat.jpg`)
   - Update the `imageAlt` for accessibility
   - Adjust positions, rotations, animations, and layers as needed

3. **Switch to image-based fragments** in `/src/components/hero/HeroSection.tsx`:
   - Import the image config: `import { fragmentImageConfig, createFragmentFromImageConfig } from "./fragmentImages.config";`
   - Replace or merge the fragments array to use image configs

## 🖼️ Image Requirements

- **Format**: JPEG (.jpg or .jpeg)
- **Recommended size**: 200-400px width (images will be scaled automatically)
- **Background**: Transparent or matching your design
- **Optimization**: Optimize images for web to ensure fast loading

## ✨ Features

- **Lazy loading**: Images load only when needed
- **Error handling**: Fallback placeholder if image fails to load
- **Animation preservation**: All floating animations work with images
- **Parallax effects**: Mouse parallax works seamlessly with images
- **Mobile responsive**: Images adapt to mobile layouts

## 📐 Current Fragment IDs

The following fragment IDs are configured:
- `chat-1`
- `calendar-1`
- `notification-1` and `notification-2`
- `task-1` and `task-2`
- `form-1`
- `connector-1`
- `list-1`
- `spreadsheet-1`
- `email-1`
- `database-1`

Match your image filenames to these IDs or update the configuration accordingly.

