interface ProductDetail {
  productId: string;
  originalPrice: number;
  quantity: number;
}

interface CreateOrderRequest {
  deliveryFee: number;
  deliveryAddr: string;
  orderTime: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  paymentMethod: string;
  discountFee: number;
  totalAmount: number;
  productDetailList: ProductDetail[];
  promoCode: string;
}