import { cartItemsStore, isCartOpen } from "@/store/cart";
import { useStore } from "@nanostores/react";
import CartItem from "@/components/ui/CartItem";
import CartSummary from "@/components/ui/CartSummary";
import type { ICartItem } from "@/types/cart";
import PromoCodeInput from "@/components/ui/PromoCodeInput";
import { navigate } from 'astro:transitions/client';
import { Download, XIcon } from 'lucide-react';
import { useRef } from "react";
import { generateCartCanvasImage } from "@/utils/image-generator";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

const CartDrawer = ({ open, onClose, onContinueShopping }: CartDrawerProps) => {
  const cart = useStore(cartItemsStore);
  const exportRef = useRef<HTMLDivElement>(null);

  const handlePayment = () => {
    isCartOpen.set(false);
    onClose();
    navigate('/checkout');
  };

  const handleDownloadCart = async () => {
    try {
      await generateCartCanvasImage(cart);
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Giỏ hàng
              </h2>
              <div className="flex items-center space-x-2">
                {/* Download Cart Button */}
                <button
                  onClick={handleDownloadCart}
                  className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-full text-primary hover:text-white hover:bg-primary transition-colors"
                  aria-label="Download cart"
                  disabled={cart.length === 0}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Lưu đơn hàng</span>
                </button>
                {/* Close Button */}
                <button
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={onClose}
                  aria-label="Close cart"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center text-lg">Giỏ hàng trống</p>
              </div>
            ) : (
              <div ref={exportRef}>
                <div className="space-y-2">
                  {cart.map((item: ICartItem) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                <div className="mt-4">
                  <CartSummary />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-4 pb-8 border-t border-gray-200 bg-white">
              <PromoCodeInput />
              <CartSummary />
              <button
                onClick={handlePayment}
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