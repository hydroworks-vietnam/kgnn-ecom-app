import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { IProduct } from "@/types/product";

const productService = {
  getProducts: (queryString: string): Promise<IProduct[]> => {
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
              message: res.data.message || 'Không có dữ liệu',
              code: res.data.statusCode || 500,
            },
          });
        }
      });
    });
  },

  getLatestProducts: (limit: number): Promise<IProduct[]> => {
    const message = {
      url: `/v1/products/latest?limit=${limit}`,
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
              message: res.data.message || 'Không có dữ liệu',
              code: res.data.statusCode || 500,
            },
          });
        }
      });
    });
  },

  getProductById: (id: string): Promise<IProduct> => {
    const message = {
      url: `/v1/products/${id}`,
      method: 'GET' as HttpAllowMethod,
    };

    return new Promise((resolve, reject) => {
      apiCall<{ data: IProduct }>(message, (res) => {
        if (res.data.statusCode === 200 && res.data.message?.data) {
          resolve(res.data.message.data);
        } else {
          reject({
            success: false,
            error: {
              message: res.data.message || 'Không có dữ liệu',
              code: res.data.statusCode || 500,
            },
          });
        }
      });
    });
  },
};

export default productService;