import useCartStore, { totalCartQuantity, isCartOpen, isFloatingCartVisible } from "@/store/cart";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "@nanostores/react";
import { ReceiptText } from "lucide-react";
import { useRef } from "react";

const FloatingCart = ({ onCartClick }: { onCartClick?: () => void }) => {
  const { calculateSubtotal } = useCartStore();
  const cartRef = useRef<HTMLButtonElement>(null);
  const $totalQuantity = useStore(totalCartQuantity);
  const $isCartOpen = useStore(isCartOpen);
  const $isFloatingCartVisible = useStore(isFloatingCartVisible);
  const total = calculateSubtotal();

  return (
    <>
      {$totalQuantity > 0 && !$isCartOpen && $isFloatingCartVisible && (
        <div className="fixed bottom-20 right-0 z-[10000]">
          <button
            ref={cartRef}
            onClick={onCartClick}
            className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded-l-lg shadow-lg hover:opacity-90 transition-all duration-200"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold">
                {$totalQuantity > 99 ? '99+' : $totalQuantity} sản phẩm
              </span>
              <div className="flex items-center gap-2">
                <ReceiptText className="w-5 h-5 bg-[#CBDB47] text-primary" />
                <span className="text-[16px] font-semibold text-[#CBDB47]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingCart;