import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { IProduct } from "@/types/product";

export const getProducts = (queryString: string): Promise<IProduct[]> => {
  const message = {
    url: `/v1/products?${queryString}`,
    method: 'GET' as HttpAllowMethod,
  };
  return new Promise((resolve, reject) => {
    apiCall<{ data: IProduct[] }>(message, (res) => {
      if (res.data.statusCode === 200 && res.data.message?.data) {
        resolve(res.data.message.data);
      } else {
        reject({
          success: false,
          error: { 
            message: res.data.message || 'No data returned', 
            code: res.data.statusCode || 500 
          },
        });
      }
    });
  });
};

export const getProductsBySearch = (message: any): Promise<IProduct[]> => {
  return new Promise((resolve, reject) => {
    apiCall<{ data: IProduct[] }>(message, (res) => {
      if (res.data.statusCode === 200 && res.data.message?.data) {
        resolve(res.data.message.data);
      } else {
        reject({
          success: false,
          error: { 
            message: res.data.message || 'No search results', 
            code: res.data.statusCode || 500 
          },
        });
      }
    });
  });
};