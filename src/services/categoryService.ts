import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { ICategory } from "@/types/product";

export const getCategories = (): Promise<ICategory[]> => {
  return new Promise((resolve, reject) => {
    const message = {
      url: '/v1/categories',
      method: 'GET' as HttpAllowMethod,
    }

    apiCall<{ data: ICategory[] }>(message, (res) => {
      if (res.data.statusCode === 200 && res.data.message?.data) {
        resolve(res.data.message.data);
      } else {
        reject({
          success: false,
          error: { 
            message: res.data.message || 'No data returned', 
            code: res.data.statusCode || 500 
          },
        })
      }
    })
  })
};