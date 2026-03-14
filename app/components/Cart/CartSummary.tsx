import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "@nanostores/react";

const CartSummary = () => {
  const { calculateSubtotal, calculateTotal } = useCartStore();
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="py-6 space-y-3">
      <div className="flex justify-between text-sm py-2 border-b border-gray-100">
        <span className="text-gray-600">Tổng giá trị sản phẩm</span>
        <span className="text-gray-600">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
        <div className="flex flex-col items-start gap-1 my-1">
          <div className="text-gray-600">Phí vận chuyển</div>
        </div>
        <div className="text-right">
          <span className="text-primary">
            Báo sau khi đặt hàng
          </span>
        </div>
      </div>
      <div className="flex justify-between text-sm py-2 border-b border-gray-100">
        <span className="text-gray-600">
          Thuế GTGT <span className="text-gray-400">ⓘ</span>
        </span>
        <span className="text-primary">
          Báo sau khi đặt hàng
        </span>
      </div>
      <div className="flex justify-between font-semibold text-base pt-3 border-t border-gray-200">
        <span className="text-gray-900">Tổng giá trị đơn hàng</span>
        <span className="text-primary">{subtotal > 0 ? formatCurrency(total) : '0 đ'}</span>
      </div>
    </div>
  );
};

export default CartSummary;
