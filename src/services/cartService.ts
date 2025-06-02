import apiCall, { type HttpAllowMethod } from "@/lib/api";
import type { IUserRank, Rank } from "@/types/user";

const cartService = {
  applyPromoCode: (code: string): Promise<{ valid: boolean; rank?: Rank }> => {
    return new Promise((resolve) => {
      const message = {
        url: `/v1/admin/users/rank?code=${encodeURIComponent(code)}`,
        method: 'GET' as HttpAllowMethod
      }

    apiCall<IUserRank>(message, (res) => {
        try {
          if (res.data.statusCode === 200 && res.data.message?.rank) {
            resolve({ valid: true, rank: res.data.message?.rank as Rank })
          } else {
            resolve({ valid: false })
          }
        } catch {
          resolve({ valid: false })
        }
      })
    })
  }
}

export default cartService;