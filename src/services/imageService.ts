import apiCall, { type HttpAllowMethod } from "@/lib/api";

const bannerService = {
  getAllBanners: (folder = 'banner'): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const message = {
        url: `/v1/common/images?category=${folder}`,
        method: 'GET' as HttpAllowMethod
      };

      apiCall<{ data: string[] }>(message, (res) => {
        if (res.data.statusCode === 200 && res.data.message?.data) {
          resolve(res.data.message.data);
        } else {
          reject({
            success: false,
            error: {
              message: res.data.message || 'Không có hình ảnh',
              code: res.data.statusCode || 500
            }
          });
        }
      });
    });
  },
};

export const imageService = {
  bannerService,
};