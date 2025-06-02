import { promoCodeStore, userRankStore } from "@/store/cart";
import cartService from "@/services/cartService";
import { useState } from "react";
import { Input } from "../Input/BasicInput";
import { cn } from "@/utils/helpers";

const PromoCodeInput = ({ onApplyCode }: { onApplyCode: (isValid: boolean) => void }) => {
  const [$promoCode, setPromoCode] = useState(promoCodeStore.get());
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasCheckedCode, setHasCheckedCode] = useState<boolean>(false);

  async function applyCode(code: string): Promise<void> {
    try {
      const res = await cartService.applyPromoCode(code);
      setHasCheckedCode(true);
      if (res.valid && res.rank) {
        promoCodeStore.set(code);
        userRankStore.set(res.rank);
        setIsValidCode(true);
        onApplyCode(true);
      } else {
        promoCodeStore.set("");
        userRankStore.set(undefined);
        setIsValidCode(false);
        onApplyCode(false);
      }
    } finally {
      setIsLoading(false);
    }
  }
  const handleApply = () => {
    if (!$promoCode.trim()) return;
    setIsLoading(true);
    applyCode($promoCode);
  }

  return (
    <div className="py-2">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={$promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Nhập mã giảm giá"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        />
        <button
          onClick={handleApply}
          className={cn("px-4 py-2 bg-primary rounded-lg text-sm", !$promoCode || isLoading ? 
            "opacity-50 bg-slate-300 text-slate-600" : 'text-white hover:bg-orange-400 hover:shadow-lg'
          )}
          disabled={isLoading || !$promoCode}
        >
          Áp dụng
        </button>
      </div>
      <div className="ml-2">
        {hasCheckedCode && (
          isValidCode
            ? <span className="text-xs text-green-600">Áp mã thành công</span>
            : <span className="text-xs text-orange-400">Mã chưa hợp lệ</span>
        )}
      </div>
    </div>
  );
};

export default PromoCodeInput;