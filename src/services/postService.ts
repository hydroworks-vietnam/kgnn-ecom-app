import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { Post } from "@/types/post";

const postService = {
  getAllPosts: (): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
      const message = {
        url: '/v1/posts',
        method: 'GET' as HttpAllowMethod,
      };

      apiCall(message, (response: any) => {
        const { data } = response;
        if (data.statusCode === 200 && data.message?.data) {
          resolve(data.message.data);
        } else {
          reject({
            success: false,
            error: {
              message: data.message || 'No posts returned',
              code: data.statusCode || 500
            }
          })
        }
      })
    })
  },

  getPostBySlug: (slug: string): Promise<Post> => {
    return new Promise((resolve, reject) => {
      const message = {
        url: `/v1/posts/${slug}`,
        method: 'GET' as HttpAllowMethod,
      };

      apiCall(message, (response: any) => {
        const { data } = response;
        if (data.statusCode === 200 && data.message) {
          resolve(data.message.data);
        } else {
          reject({
            success: false,
            error: {
              message: data.message,
              code: data.statusCode || 500
            }
          });
        }
      });
    });
  },

  getRelatedPosts: async (currentPostId: string, limit: number = 3): Promise<Post[]> => {
    const allPosts = await postService.getAllPosts();
    return allPosts
      .filter(post => post.id !== currentPostId)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  }
};

export default postService;