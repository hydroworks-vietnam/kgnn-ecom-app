import { cartItemsStore, isCartOpen } from "@/store/cart";
import { useStore } from "@nanostores/react";
import CartItem from "~/components/Cart/CartItem";
import CartSummary from "~/components/Cart/CartSummary";
import type { ICartItem } from "@/types/cart";
import { Download, X, ShoppingBag } from 'lucide-react';
import { useRef, useState, useEffect } from "react";
import { generateCartCanvasImage } from "@/utils/image-generator";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

const CartDrawer = ({ open, onClose, onContinueShopping }: CartDrawerProps) => {
  const cart = useStore(cartItemsStore);
  const exportRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    return () => {
      isCartOpen.set(false);
    };
  }, []);

  const handlePayment = () => {
    isCartOpen.set(false);
    onClose();
    window.location.href = '/checkout';
  };

  const handleDownloadCart = async () => {
    if (cart.length === 0) return;

    setIsDownloading(true);
    try {
      await generateCartCanvasImage(cart);
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return open && (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />

      <div
        className='fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out'
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-50 rounded-full">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Giỏ hàng</h2>
                  {cart.length > 0 && (
                    <p className="text-sm text-gray-500">{totalItems} sản phẩm</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    onClick={handleDownloadCart}
                    disabled={isDownloading}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Lưu đơn hàng"
                  >
                    <Download className={`w-4 h-4 ${isDownloading ? 'animate-pulse' : ''}`} />
                    <span className="text-sm font-medium hidden sm:block">
                      {isDownloading ? 'Đang lưu...' : 'Lưu giỏ hàng'}
                    </span>
                  </button>
                )}

                <button
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  onClick={onClose}
                  aria-label="Đóng giỏ hàng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-[calc(100vh-100px)]">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Giỏ hàng trống
                </h3>
                <p className="text-gray-500 text-center mb-6 max-w-sm">
                  Hãy khám phá các sản phẩm tuyệt vời và thêm chúng vào giỏ hàng của bạn
                </p>
                <button
                  onClick={onContinueShopping}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Bắt đầu mua sắm
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div ref={exportRef} className="space-y-4">
                    {cart.map((item: ICartItem, index: number) => (
                      <div key={item.product.id} className="group">
                        <CartItem item={item} />
                        {index < cart.length - 1 && (
                          <div className="mt-4 border-b border-gray-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 space-y-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                    <CartSummary />
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handlePayment}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200"
                    >
                      Đến trang thanh toán
                    </button>
                    <button
                      onClick={onContinueShopping}
                      className="w-full py-3 text-gray-600 hover:text-gray-800 border-2 border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
