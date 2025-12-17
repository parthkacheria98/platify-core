import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

// Helper function to detect and convert video URLs to embed URLs
const getVideoEmbedUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      let videoId: string | null = null;
      if (hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get("v");
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Loom
    if (hostname.includes("loom.com")) {
      const pathParts = urlObj.pathname.split("/");
      const shareId = pathParts[pathParts.length - 1];
      if (shareId) {
        return `https://www.loom.com/embed/${shareId}`;
      }
    }

    // Vimeo
    if (hostname.includes("vimeo.com")) {
      const videoId = urlObj.pathname.split("/").filter(Boolean).pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
};

// Helper to check if text is just a video URL
const isVideoUrl = (text: string): boolean => {
  try {
    const url = text.trim();
    const embedUrl = getVideoEmbedUrl(url);
    return embedUrl !== null;
  } catch {
    return false;
  }
};

// Helper to check if text is an image URL
const isImageUrl = (text: string): boolean => {
  try {
    const url = text.trim();
    // Check if it's a valid URL
    new URL(url);
    // Check if it ends with an image extension
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.ico'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext));
  } catch {
    return false;
  }
};

interface CaseStudyMarkdownProps {
  content: string;
}

export const CaseStudyMarkdown: React.FC<CaseStudyMarkdownProps> = ({ content }) => {
  const components: Components = {
    // Headings
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-light mb-6 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-light mb-5 mt-7">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-light mb-4 mt-6">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl md:text-2xl font-normal mb-3 mt-5">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg md:text-xl font-normal mb-2 mt-4">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base md:text-lg font-normal mb-2 mt-3">{children}</h6>,

    // Paragraphs - detect video URLs and video tags
    p: ({ children, node }) => {
      // Check if this paragraph contains a video element (from rehype-raw)
      const childrenArray = React.Children.toArray(children);
      const hasVideoElement = childrenArray.some(
        (child) => React.isValidElement(child) && (child.type === 'video' || (child.type as any)?.displayName === 'video')
      );
      
      if (hasVideoElement) {
        // Return children directly - the video component will handle it
        return <>{children}</>;
      }

      // Check if paragraph contains raw HTML video tag (as string)
      let textContent = "";
      let linkHref = "";
      let rawHtml = "";

      React.Children.forEach(children, (child) => {
        if (typeof child === "string") {
          textContent += child;
          rawHtml += child;
        } else if (React.isValidElement(child)) {
          // If it's a link, get the href
          if (child.type === "a" && child.props.href) {
            linkHref = child.props.href;
            textContent += child.props.href;
          } else if (child.type === "video") {
            // Video element found
            return;
          } else {
            // For other elements, try to extract text
            const childText = React.Children.toArray(child.props?.children || [])
              .filter((c) => typeof c === "string")
              .join("");
            textContent += childText;
          }
        }
      });

      // Check if the paragraph contains a video tag in raw HTML (when rehype-raw hasn't processed it yet)
      // This handles cases where the HTML is still a string
      if (rawHtml.includes('<video')) {
        // Extract video tag - handle both self-closing and with closing tag
        const videoMatch = rawHtml.match(/<video[^>]*(?:\/>|>[\s\S]*?<\/video>)/i);
        if (videoMatch) {
          // Parse the video tag attributes
          let videoHtml = videoMatch[0];
          // If it's self-closing, convert to proper format
          if (videoHtml.endsWith('/>')) {
            videoHtml = videoHtml.replace('/>', '></video>');
          }
          // Ensure the video has the style attribute if not present
          if (!videoHtml.includes('style=')) {
            videoHtml = videoHtml.replace('<video', '<video style="width:100%; border-radius:12px;"');
          }
          // Use dangerouslySetInnerHTML to render the video tag
          return (
            <div 
              className="my-8 w-full"
              dangerouslySetInnerHTML={{ 
                __html: videoHtml
              }}
            />
          );
        }
      }

      const trimmedContent = textContent.trim();
      
      // Check if the paragraph is just a video URL (either as text or link)
      if (trimmedContent && isVideoUrl(trimmedContent)) {
        const embedUrl = getVideoEmbedUrl(trimmedContent);
        if (embedUrl) {
          return (
            <div className="my-8 overflow-hidden border-2 border-border rounded-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={embedUrl}
                  title="Video embed"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
      }

      // Check if the paragraph is just an image URL
      if (trimmedContent && isImageUrl(trimmedContent)) {
        return (
          <div className="my-8 w-full">
            <img
              src={trimmedContent}
              alt=""
              className="w-full h-auto rounded-lg border border-border block"
              loading="lazy"
            />
          </div>
        );
      }

      return <p className="text-muted-foreground text-lg leading-relaxed mb-6">{children}</p>;
    },

    // Images - responsive
    img: (props: any) => {
      const { src, alt } = props;
      if (!src) return null;
      
      return (
        <div className="my-8 w-full">
          <img
            src={src}
            alt={alt || ""}
            className="w-full h-auto rounded-lg border border-border block"
            loading="lazy"
          />
        </div>
      );
    },

    // Links - convert video/image URLs to embeds/images if standalone
    a: ({ href, children, node }) => {
      if (href && isVideoUrl(href)) {
        const embedUrl = getVideoEmbedUrl(href);
        if (embedUrl) {
          return (
            <div className="my-8 overflow-hidden border-2 border-border rounded-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={embedUrl}
                  title="Video embed"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
      }

      // Check if link is an image URL
      if (href && isImageUrl(href)) {
        return (
          <div className="my-8 w-full">
            <img
              src={href}
              alt={typeof children === 'string' ? children : ''}
              className="w-full h-auto rounded-lg border border-border block"
              loading="lazy"
            />
          </div>
        );
      }

      return (
        <a
          href={href}
          className="text-primary hover:text-primary-hover underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground text-lg">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground text-lg">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground text-lg">
        {children}
      </blockquote>
    ),

    // Code
    code: (props: any) => {
      const { inline, children, className } = props;
      if (inline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
            {children}
          </code>
        );
      }
      return (
        <code className={`block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono text-foreground ${className || ""}`}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => <pre className="mb-6">{children}</pre>,

    // Horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    // Video tags - allow HTML video elements
    video: (props: any) => {
      const { src, autoplay, loop, muted, playsinline, preload, style, ...rest } = props;
      // Handle boolean attributes - if they exist in props, they're true
      const videoProps: any = {
        src,
        preload: preload || "none",
        className: "w-full rounded-lg border border-border",
        controls: true,
        ...rest
      };
      
      // Handle boolean attributes correctly
      if (autoplay !== undefined) videoProps.autoPlay = true;
      if (loop !== undefined) videoProps.loop = true;
      if (muted !== undefined) videoProps.muted = true;
      if (playsinline !== undefined) videoProps.playsInline = true;
      
      // Merge custom style with default
      const mergedStyle = {
        width: '100%',
        borderRadius: '12px',
        ...(style || {})
      };
      
      return (
        <div className="my-8 w-full">
          <video {...videoProps} style={mergedStyle} />
        </div>
      );
    },
  };

  // Pre-process content to handle video tags that might be escaped
  const processedContent = content.replace(
    /&lt;video([^&]*?)&gt;[\s\S]*?&lt;\/video&gt;/gi,
    (match) => match.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  );

  return (
    <div className="prose prose-sans prose-lg max-w-none prose-invert prose-img:my-8 prose-img:rounded-lg prose-img:border prose-img:border-border">
      <ReactMarkdown 
        components={components} 
        rehypePlugins={[rehypeRaw]}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

