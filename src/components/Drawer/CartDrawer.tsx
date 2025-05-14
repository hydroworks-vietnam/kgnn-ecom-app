import { cartItemsStore, isCartOpen } from "@/store/cart";
import { useStore } from "@nanostores/react";
import CartItem from "@/components/ui/CartItem";
import CartSummary from "@/components/ui/CartSummary";
import type { ICartItem } from "@/types/cart";
import PromoCodeInput from "@/components/ui/PromoCodeInput";
import { navigate } from 'astro:transitions/client';
import { Download } from 'lucide-react';
import { useRef } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  callPayment: () => void;
  onContinueShopping: () => void;
}

const CartDrawer = ({ open, onClose, callPayment, onContinueShopping }: CartDrawerProps) => {
  const cart = useStore(cartItemsStore);
  const exportRef = useRef<HTMLDivElement>(null);

  const handlePayment = () => {
    isCartOpen.set(false);
    onClose();
    navigate('/checkout');
  };

  const loadProxiedImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(src)}`;
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = proxyUrl;
    });
  };

  const generateCartCanvasImage = async (
    cart: ICartItem[],
    discount = 0,
    shippingFee = 0
  ) => {
    const pixelRatio = 2;
    const padding = 24;
    const itemHeight = 90;
    const imageSize = 60;
    const width = 700;
    const height = cart.length * itemHeight + 250;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    let y = padding;

    for (const item of cart) {
      try {
        const img = await loadProxiedImage(item.product.images[0]);
        const radius = 8;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.arcTo(padding + imageSize, y, padding + imageSize, y + imageSize, radius);
        ctx.arcTo(padding + imageSize, y + imageSize, padding, y + imageSize, radius);
        ctx.arcTo(padding, y + imageSize, padding, y, radius);
        ctx.arcTo(padding, y, padding + imageSize, y, radius);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, padding, y, imageSize, imageSize);
        ctx.restore();
      } catch {
        ctx.fillStyle = "#f3f4f6";
        ctx.fillRect(padding, y, imageSize, imageSize);
        ctx.fillStyle = "#888";
        ctx.font = "12px sans-serif";
        ctx.fillText("No Image", padding + 10, y + 20);
      }

      const textX = padding + imageSize + 16;
      const total = item.quantity * item.product.unit_price;

      ctx.fillStyle = "#111827";
      ctx.font = "bold 16px Arial";
      ctx.fillText(item.product.name, textX, y);

      ctx.fillStyle = "#6b7280";
      ctx.font = "14px Arial";
      ctx.fillText(`SL: ${item.quantity}`, textX, y + 24);

      ctx.fillStyle = "#000";
      ctx.fillText(`Tổng: ${total.toLocaleString()}đ`, textX, y + 48);

      y += itemHeight;
    }

    // Divider
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    y += 20;

    const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.product.unit_price, 0);
    const finalTotal = subtotal - discount + shippingFee;

    // Summary Rows
    const drawSummaryRow = (label: string, value: string, bold = false) => {
      ctx.fillStyle = "#374151"; // gray-700
      ctx.font = bold ? "bold 16px Arial" : "14px Arial";
      ctx.fillText(label, padding, y);
      ctx.fillText(value, width - padding - ctx.measureText(value).width, y);
      y += 28;
    };

    drawSummaryRow("Tạm tính", `${subtotal.toLocaleString()}đ`);
    drawSummaryRow("Giảm giá", `-${discount.toLocaleString()}đ`);
    drawSummaryRow("Phí vận chuyển", `${shippingFee.toLocaleString()}đ`);
    drawSummaryRow("Tổng cộng", `${finalTotal.toLocaleString()}đ`, true);

    // Export
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.download = `DonHang_${timestamp}_HD.png`;
    link.href = dataUrl;
    link.click();
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
                  <span className="text-2xl leading-none">×</span>
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