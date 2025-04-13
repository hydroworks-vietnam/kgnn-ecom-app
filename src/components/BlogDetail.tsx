
import type { Post } from '@/types/post';

interface BlogDetailProps {
  post: Post;
  // relatedPosts: Post[];
}

export default function BlogDetail({ post }: BlogDetailProps) {
  // Format the date
  const date = new Date(post.created_at);
  const formattedDate = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
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
      
      {/* {relatedPosts.length > 0 && ( */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              Đang cập nhật ....
            </div>
            {/* {relatedPosts.map((relatedPost) => {
              const relatedSlug = removeVietnameseTones(relatedPost.title)
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

              return (
                <a 
                  key={relatedPost.id}
                  href={`/blog/${relatedSlug}`}
                  className="block p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{relatedPost.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(relatedPost.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </a>
              );
            })} */}
          </div>
        </section>
      {/* )} */}
    </article>
  );
} 