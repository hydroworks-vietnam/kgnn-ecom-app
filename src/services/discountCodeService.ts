// /**
//  * Validate discount code via kgnn-product-service.
//  * Input: code, productIds, token (Authorization), xRequestId (optional)
//  * Output: { valid, rank, discount }
//  */
// export async function validateDiscountCode(
//   code: string,
//   productIds: string[],
//   token?: string,
//   xRequestId?: string
// ): Promise<{ valid: boolean; rank?: string; discount?: number }> {
//   const res = await fetch(
//     "http://ec2-13-229-231-46.ap-southeast-1.compute.amazonaws.com/api/discount-code/validate",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: token } : {}),
//         ...(xRequestId ? { "X-Request-Id": xRequestId } : {}),
//       },
//       body: JSON.stringify({ code, productIds }),
//     }
//   );
//   if (!res.ok) throw new Error("Mã giảm giá không hợp lệ hoặc lỗi hệ thống");
//   return res.json();
// }