import useCartStore, { discountRateStore } from "@/store/cart";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "@nanostores/react";

const CartSummary = () => {
  const { calculateSubtotal, calculateDiscount, calculateTax, calculateTotal } = useCartStore();
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const tax = calculateTax();
  const total = calculateTotal();
  const $discountRate = useStore(discountRateStore)

  return (
    <div className="py-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tổng đơn hàng</span>
        <span className="text-gray-900">{formatCurrency(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Giảm giá</span>
          <span className="text-gray-900">
            ({$discountRate}%) -{formatCurrency(discount)}
          </span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Tax <span className="text-gray-400">ⓘ</span>
        </span>
        <span className="text-gray-900">+{formatCurrency(tax)}</span>
      </div>
      <div className="flex justify-between text-base font-semibold">
        <span className="text-gray-900">Tổng cộng</span>
        <span className="text-gray-900">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default CartSummary;