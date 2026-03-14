import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { promoCodeStore } from '@/store/cart';
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/utils/helpers';

interface PromoCodeInputProps {
  onApplyCode: (isValid: boolean) => void;
}

const PromoCodeInput = ({ onApplyCode }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const promoCode = useStore(promoCodeStore);
  const { calculateDiscount } = useCartStore();

  const handleApply = () => {
    if (!code.trim()) {
      onApplyCode(false);
      return;
    }

    setIsApplied(true);
    promoCodeStore.set(code);
    onApplyCode(true);
  };

  const handleRemove = () => {
    setIsApplied(false);
    setCode('');
    promoCodeStore.set('');
    onApplyCode(true);
  };

  const discount = calculateDiscount();

  return (
    <div className="space-y-3">
      {!isApplied ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Áp dụng
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-700 font-medium">{code}</span>
            <span className="text-green-600 text-sm">
              (-{formatCurrency(discount)})
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="text-gray-500 hover:text-red-500"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
