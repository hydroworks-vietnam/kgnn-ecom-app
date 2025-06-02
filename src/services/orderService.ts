import apiCall, { type HttpAllowMethod } from "@/lib/api";

export const orderService = {
  createOrder: (orderData: CreateOrderRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
      const message = {
        url: '/v1/orders',
        method: 'POST' as HttpAllowMethod,
        body: orderData,
      };

      apiCall(message, (response: any) => {
        const { data } = response;
        if (data.statusCode === 200 && data.message) {
          resolve(data.message.data);
        } else {
          reject({
            success: false,
            error: {
              message: data.message || 'Không thể tạo đơn hàng',
              code: data.statusCode || 500
            }
          });
        }
      });
    });
  }
};