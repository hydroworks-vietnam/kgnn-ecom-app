import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { IUserRank } from "@/types/user";

const CartService = {
  applyPromoCode: (code: string): Promise<{ valid: boolean; rank?: string }> => {
    return new Promise((resolve) => {
      const message = {
        url: `/v1/admin/users/rank?code=${encodeURIComponent(code)}`,
        method: 'GET' as HttpAllowMethod,
        headers: {
          'X-Request-Id': crypto.randomUUID()
        }
      };

  apiCall<IUserRank>(message, (res) => {
        try {
          console.log("🚀 ~ res:", res);
          if (res.data.statusCode === 200 && res.data.message?.rank) {
            resolve({ valid: true, rank: res.data.message?.rank });
          } else {
            resolve({ valid: false });
          }
        } catch {
          resolve({ valid: false });
        }
      });
    });
  }
};

export default CartService;