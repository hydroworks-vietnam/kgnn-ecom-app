import React, { useEffect, useState } from 'react';
import type { Post } from '@/types/post';
import { ChevronRight } from 'lucide-react';
import postService from '@/services/postService';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();

        if (response.length > 0) {
          const sortedPosts = [...response].sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          setPosts(sortedPosts);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Không tải được bài viết');
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return '';
    }
  };

  const stripHtml = (html: string): string => {
    if (!html) return '';
    const stripped = html.replace(/<[^>]*>/g, '');
    return stripped.replace(/&[^;]+;/g, ' ').trim();
  };

  const getFirstImageFromContent = (content: string): string | null => {
    if (!content) return null;
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#151875] mb-4">Bài viết</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kinh nghiệm và kiến thức mới nhất về thuỷ canh hữu cơ hướng tới nông nghiệp bền vững.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FB2E86]"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Hiển thị {posts.length} bài viết
        </div>
      </div>

      {posts.length > 0 && posts.map((post) => (
        <div className="mb-16" key={post.id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={getFirstImageFromContent(post.content) || '/assets/fallback-img.png'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-primary">
                    Viết bởi: {post.author === 'system' ? 'Admin' : post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#FFA454]">{formatDate(post.created_at)}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#151875] mb-4">
                  <div className="hover:text-primary">
                    {post.title}
                  </div>
                </h3>
                <div className="text-gray-600 mb-6 line-clamp-4">
                  {stripHtml(post.content)}
                </div>
                <div onClick={() => window.location.href = `/blog/${post.slug}`}
                  className="px-6 py-2 bg-gradient text-white rounded-full hover:bg-gradient/90 transition-colors inline-flex items-center cursor-pointer"
                >
                  Xem thêm
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {error && (
        <div className="text-center py-12">
          <div className="text-primary text-lg mb-4">{error}</div>
          <a href="/" className="px-6 py-2 bg-gradient text-white rounded-full hover:bg-gradient/90 transition-colors">
            Về trang chủ
          </a>
        </div>
      )}
    </div>
  );
};

export default Blog; 