export interface Author {
  name: string;
  nameUrdu?: string;
  role: string;
  roleUrdu?: string;
  avatar: string;
  bio?: string;
  bioUrdu?: string;
}

export interface Category {
  id: string;
  name: string; // English / Urdu
  nameUrdu?: string;
  englishName: string;
  slug: string;
  color: string; // e.g., 'emerald', 'purple', 'sky'
  icon: string; // lucide icon name
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleUrdu?: string;
  excerpt: string;
  excerptUrdu?: string;
  contentHtml: string;
  contentHtmlUrdu?: string;
  category: Category;
  author: Author;
  publishDate: string;
  readingTime: string;
  featuredImage: string;
  thumbnailImage: string;
  videoPlaceholder?: {
    type: 'local' | 'youtube';
    url: string;
    title: string;
  };
  gallery?: string[];
  tags: string[];
  trending?: boolean;
  popular?: boolean;
  relatedIds?: string[];
}

export type ViewPage =
  | { type: 'home' }
  | { type: 'blog-listing'; categorySlug?: string; searchQuery?: string }
  | { type: 'single-blog'; blogId: string }
  | { type: 'categories' }
  | { type: 'latest' }
  | { type: 'writers'; selectedWriterName?: string }
  | { type: 'videos' }
  | { type: 'images' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'privacy-policy' }
  | { type: 'terms-conditions' }
  | { type: 'disclaimer' }
  | { type: 'cookie-policy' }
  | { type: 'not-found' };
