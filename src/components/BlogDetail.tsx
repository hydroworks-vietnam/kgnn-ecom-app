
import postService from '@/services/postService';
import type { Post } from '@/types/post';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function BlogDetail({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const result = await postService.getPostBySlug(slug);
        if (!result) {
          throw new Error(`Post not found for slug: ${slug}`);
        }
        setPost(result);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Không tìm thấy bài viết');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Strip HTML for meta description
  const stripHtml = (html: string): string => {
    if (!html) return '';
    const stripped = html.replace(/<[^>]*>/g, '');
    return stripped.replace(/&[^;]+;/g, ' ').trim().slice(0, 160);
  };

  if (isLoading) {
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-64 bg-gray-300 rounded mb-8"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-48 bg-gray-300 rounded"></div>
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <h3>{error}</h3>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <h3>Không tìm thấy bài viết</h3>
      </article>
    );
  }

  // Format the date
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Không gian nhà nông`}</title>
        <meta name="description" content={stripHtml(post.title)} />
        {/* Add Open Graph tags for better link sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={stripHtml(post.title)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://khonggiannhanong.site/blog/${slug}`} />
        {/* Add og:image if available */}
      </Helmet>
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600">
            <time dateTime={post.created_at}>{formattedDate}</time>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>Đang cập nhật ....</div>
          </div>
        </section>
      </article>
    </>
  );
} 