import { useCartStore, userRankStore } from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { X, Minus, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

interface CartItemProps {
  item: ICartItem;
  setAlertOpen?: (open: boolean) => void;
}

const CartItem = ({ item, setAlertOpen }: CartItemProps) => {
  const { product, quantity } = item;
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const { id, name, images, unit_price, price_variants } = product;
  const userRank = useStore(userRankStore);

  useEffect(() => {
    if (userRank) {
      if (!price_variants || price_variants.length === 0) {
        setAlertOpen?.(true);
      } else {
        const variant = price_variants.find((v) => v.rank === userRank);
        if (!variant) {
          setAlertOpen?.(true);
        } else {
          setAlertOpen?.(false);
        }
      }
    } else {
      setAlertOpen?.(false);
    }
  }, [userRank, price_variants, setAlertOpen]);

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  const getDiscountInfo = () => {
    if (userRank && price_variants) {
      const variant = price_variants.find((v) => v.rank === userRank);
      if (variant && variant.price < unit_price) {
        const discountPercent = Math.round(((unit_price - variant.price) / unit_price) * 100);
        return {
          hasDiscount: true,
          originalPrice: unit_price,
          discountedPrice: variant.price,
          discountPercent
        };
      }
    }
    return {
      hasDiscount: false,
      originalPrice: unit_price,
      discountedPrice: unit_price,
      discountPercent: 0
    };
  };

  const discountInfo = getDiscountInfo();

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow duration-200">
      <div className="relative w-20 h-20 flex-shrink-0">
        <SafetyImage
          clazz="w-full h-full rounded-lg object-cover"
          src={images?.[0]}
          height={80}
          width={80}
        />
        {discountInfo.hasDiscount && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            -{discountInfo.discountPercent}%
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="mb-3">
          {discountInfo.hasDiscount ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Đơn giá:</span>
                <span className="line-through text-gray-400">
                  {formatCurrency(discountInfo.originalPrice)}
                </span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(discountInfo.discountedPrice)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-500 text-sm">Tổng cộng:</span>
                <span className="text-gray-600 line-through text-sm">
                  {formatCurrency(discountInfo.originalPrice * quantity)}
                </span>
                <span className="font-bold text-primary">
                  {formatCurrency(discountInfo.discountedPrice * quantity)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                Đơn giá: {formatCurrency(unit_price)}
              </div>
              <div className="font-bold text-gray-900 text-lg">
                {formatCurrency(unit_price * quantity)}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrease}
              className="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 transition-colors duration-200"
              disabled={quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </button>

            <span className="text-sm font-semibold text-gray-900 min-w-[1rem] text-center">
              {quantity}
            </span>

            <button
              onClick={handleIncrease}
              className="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 transition-colors duration-200"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            aria-label="Xóa sản phẩm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
