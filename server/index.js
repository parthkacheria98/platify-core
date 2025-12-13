import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendContactEmail } from './emailService.js';

dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_POSTS_FILE = path.join(__dirname, 'blogPosts.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  'http://localhost:8080',
  'https://platify.cloud',
  'https://www.platify.cloud'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) - but only from same server
    if (!origin) {
      // In production, be more restrictive
      if (process.env.NODE_ENV === 'production') {
        return callback(new Error('Not allowed by CORS'));
      }
      return callback(null, true);
    }
    
    // Check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (process.env.FRONTEND_URL) {
      // Allow the configured frontend URL and its www variant
      const frontendUrl = process.env.FRONTEND_URL;
      const wwwVariant = frontendUrl.replace(/^https?:\/\//, 'https://www.');
      if (origin === frontendUrl || origin === wwwVariant) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } else {
      // Development mode - allow localhost
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Helper function to read blog posts from JSON file
const readBlogPosts = () => {
  try {
    if (fs.existsSync(BLOG_POSTS_FILE)) {
      const data = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

// Helper function to write blog posts to JSON file
const writeBlogPosts = (posts) => {
  try {
    fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing blog posts:', error);
    return false;
  }
};

// Blog posts endpoints
// GET /api/blog/posts - Get all blog posts
app.get('/api/blog/posts', (req, res) => {
  try {
    const posts = readBlogPosts();
    // Filter by published status if query param is provided
    const publishedOnly = req.query.published === 'true';
    const filteredPosts = publishedOnly 
      ? posts.filter(p => p.published === true)
      : posts;
    res.json({ success: true, data: filteredPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/posts/:slug - Get a single blog post by slug
app.get('/api/blog/posts/:slug', (req, res) => {
  try {
    const posts = readBlogPosts();
    const post = posts.find(p => p.slug === req.params.slug && p.published === true);
    if (post) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// POST /api/blog/posts - Create or update blog posts
app.post('/api/blog/posts', (req, res) => {
  try {
    const posts = readBlogPosts();
    const newPost = req.body;

    // Validate required fields
    if (!newPost.title || !newPost.slug || !newPost.excerpt) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, slug, and excerpt are required' 
      });
    }

    // Check if post with same slug exists (for updates)
    const existingIndex = posts.findIndex(p => p.id === newPost.id);
    
    if (existingIndex !== -1) {
      // Update existing post
      posts[existingIndex] = { ...posts[existingIndex], ...newPost };
    } else {
      // Create new post
      if (!newPost.id) {
        newPost.id = Date.now().toString();
      }
      posts.push(newPost);
    }

    // Write to file
    if (writeBlogPosts(posts)) {
      res.json({ 
        success: true, 
        message: existingIndex !== -1 ? 'Post updated successfully' : 'Post created successfully',
        data: existingIndex !== -1 ? posts[existingIndex] : newPost
      });
    } else {
      res.status(500).json({ error: 'Failed to save blog post' });
    }
  } catch (error) {
    console.error('Error saving blog post:', error);
    res.status(500).json({ error: 'Failed to save blog post' });
  }
});

// PUT /api/blog/posts/:id - Update a specific blog post
app.put('/api/blog/posts/:id', (req, res) => {
  try {
    const posts = readBlogPosts();
    const postId = req.params.id;
    const updatedPost = req.body;

    const existingIndex = posts.findIndex(p => p.id === postId);
    
    if (existingIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    posts[existingIndex] = { ...posts[existingIndex], ...updatedPost, id: postId };

    // Write to file
    if (writeBlogPosts(posts)) {
      res.json({ 
        success: true, 
        message: 'Post updated successfully',
        data: posts[existingIndex]
      });
    } else {
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// DELETE /api/blog/posts/:id - Delete a blog post
app.delete('/api/blog/posts/:id', (req, res) => {
  try {
    const posts = readBlogPosts();
    const postId = req.params.id;

    const filteredPosts = posts.filter(p => p.id !== postId);

    if (filteredPosts.length === posts.length) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Write to file
    if (writeBlogPosts(filteredPosts)) {
      res.json({ 
        success: true, 
        message: 'Post deleted successfully'
      });
    } else {
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send email
    await sendContactEmail({ name, email, company, message });

    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully. We\'ll be in touch within 24 hours.' 
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

