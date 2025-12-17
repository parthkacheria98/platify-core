import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CaseStudyMarkdown } from "@/components/CaseStudyMarkdown";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  published: boolean;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch post from API
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate("/blog");
            return;
          }
          throw new Error('Failed to fetch blog post');
        }
        const result = await response.json();
        if (result.success && result.data) {
          setPost(result.data);
        } else {
          navigate("/blog");
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <span className="mr-2">←</span>
            <span>Back to Insights</span>
          </Link>

          <div className="animate-fade-in-up">
            <div className="text-sm text-muted-foreground mb-4">{post.category}</div>
            <h1 className="mb-6 md:mb-8">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="pb-24 md:pb-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {post.content ? (
            <CaseStudyMarkdown content={post.content} />
          ) : (
            <div className="text-muted-foreground leading-relaxed text-lg space-y-6">
              <p className="text-xl font-light text-foreground mb-8">{post.excerpt}</p>
              <p>
                This is a placeholder for the full blog post content. The content can be added in the admin panel.
              </p>
              <p>
                To add content to this post, go to the admin panel and edit the post. You can use markdown formatting including images, videos (YouTube, Loom, Vimeo), headings, lists, and blockquotes.
              </p>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link 
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
            >
              <span>← Back to Insights</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;

