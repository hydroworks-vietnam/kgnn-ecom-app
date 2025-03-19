import useCartStore, { discountRateStore } from "@/store/cart";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "@nanostores/react";

const CartSummary = () => {
  const { calculateSubtotal, calculateTotal } = useCartStore();
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="py-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tổng giá trị sản phẩm</span>
        <span className="text-gray-600">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex flex-col items-start gap-1 my-1">
          <div className="text-gray-600">Phí vận chuyển</div>
          {/* <div className="text-green-600 text-xs">
            Miễn phí cho đơn hàng từ {formatCurrency(2000000)}
          </div> */}
        </div>
        <div className="text-right">
          <span className="text-primary">
            Báo sau khi đặt hàng
            {/* {subtotal > 0 ? formatCurrency(shippingFee) : '0 đ'} */}
          </span>
        </div>
      </div>
      {/* <div className="flex justify-between text-sm">
        <span className="text-gray-600">Giảm giá ({$discountRate}%)</span>
        <span className="text-orange-400">
          {discount > 0 ? `- ${formatCurrency(discount)}` : '0 đ'}
        </span>
      </div> */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Thuế GTGT <span className="text-gray-400">ⓘ</span>
        </span>
        <span className="text-primary">
          Báo sau khi đặt hàng
          {/* {formatCurrency(tax)} */}
        </span>
      </div>
      <div className="flex justify-between font-semibold text-base pt-2 border-t">
        <span className="text-gray-900">Tổng giá trị đơn hàng</span>
        <span className="text-primary">{subtotal > 0 ? formatCurrency(total) : '0 đ'}</span>
      </div>
    </div>
  );
};

export default CartSummary;