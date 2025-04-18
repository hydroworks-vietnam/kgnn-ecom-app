import { useState } from "react";
import { useStore } from "@nanostores/react";
import { promoCodeStore } from "@/store/cart";
import useCartStore from "@/store/cart";

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

export default PromoCodeInput;