import useCartStore, { cartItemsStore, promoCodeStore, totalCartQuantity } from "@/store/cart";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import CartItem from "../ui/CartItem";
import CartSummary from "../ui/CartSummary";
import type { ICartItem } from "@/types/cart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  callPayment: () => void;
  onContinueShopping: () => void;
}

const CartDrawer = ({ open, onClose, callPayment, onContinueShopping }: CartDrawerProps) => {
  const cart = useStore(cartItemsStore);
  const $totalQuantity = useStore(totalCartQuantity);

  const PromoCodeInput = () => {
    const [$promoCode, setPromoCode] = useState(useStore(promoCodeStore));
    const { applyPromoCode } = useCartStore()

    const handleApply = () => {
      applyPromoCode($promoCode);
    };

    return (
      <div className="flex items-center gap-2 py-4">
        <input
          type="text"
          value={$promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Nhập mã giảm giá"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gradient rounded-lg text-sm text-white hover:shadow-lg transition-colors"
        >
          Áp dụng
        </button>
        {$promoCode && (
          <span className="text-xs text-green-600">20% off discount applied!</span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Giỏ hàng
              </h2>
              <button
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={onClose}
                aria-label="Close cart"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center text-lg">Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item: ICartItem) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-4 pb-8 border-t border-gray-200 bg-white">
              <PromoCodeInput />
              <CartSummary />
              <button
                onClick={callPayment}
                className="w-full py-2 bg-gradient text-white rounded-lg text-sm hover:shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đến trang thanh toán
              </button>
              <button
                onClick={onContinueShopping}
                className="w-full text-gray-500 border rounded-lg border-slate-300 py-2 mt-2 text-sm hover:shadow-lg"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;