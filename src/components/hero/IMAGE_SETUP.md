# Switching to Image-Based Fragments

## Quick Start

### Step 1: Upload Your JPEG Images

Upload your JPEG files to `/public/hero-fragments/` directory:

```
/public/hero-fragments/
  ├── chat.jpg
  ├── calendar.jpg
  ├── notification.jpg
  ├── task.jpg
  ├── form.jpg
  ├── connector.jpg
  ├── list.jpg
  ├── spreadsheet.jpg
  ├── email.jpg
  └── database.jpg
```

### Step 2: Update Fragment Configuration

In `/src/components/hero/HeroSection.tsx`, replace component-based fragments with image-based ones:

**Before (Component-based):**
```typescript
{
  id: "chat-1",
  component: ChatFragment,
  position: { top: "10%", left: "5%" },
  // ... rest
}
```

**After (Image-based):**
```typescript
{
  id: "chat-1",
  imagePath: "/hero-fragments/chat.jpg",
  imageAlt: "Chat tool fragment",
  position: { top: "10%", left: "5%" },
  // ... rest stays the same
}
```

### Step 3: Remove Component Import (Optional)

If you're using only images, you can remove the component imports from the top of `HeroSection.tsx`.

## Example: Converting One Fragment

Here's a complete example converting the `chat-1` fragment:

```typescript
// In HeroSection.tsx, find:
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

// Replace with:
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
```

## Using the Image Config File

For easier management, you can import the pre-configured image setup:

```typescript
import { fragmentImageConfig, createFragmentFromImageConfig } from "./fragmentImages.config";

// Then in your fragments array:
const fragments: FragmentConfig[] = fragmentImageConfig.map(createFragmentFromImageConfig);
```

## Features Preserved

✅ All animations (float-slow, float-medium, float-fast)  
✅ Parallax mouse effects  
✅ Layer-based opacity and blur  
✅ Mobile responsiveness  
✅ Rotation and positioning  
✅ Lazy loading for performance  

## Image Requirements

- **Format**: JPEG (.jpg or .jpeg)
- **Size**: 200-400px width recommended (auto-scaled)
- **Optimization**: Optimize for web (use tools like ImageOptim, TinyPNG, etc.)
- **Naming**: Use descriptive names matching your fragment IDs

## Performance

Images are automatically:
- Lazy loaded (only when in viewport)
- Error-handled (fallback placeholder if missing)
- Optimized for web (proper loading attributes)

## Need Help?

See `/public/hero-fragments/README.md` for more details.

