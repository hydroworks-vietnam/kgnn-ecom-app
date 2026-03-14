import { useState } from 'react';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCart, Plus, Heart, Search } from 'lucide-react';

interface ProductCardFullProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const ProductCardFull = ({ product, onAddToCart }: ProductCardFullProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex justify-center gap-6 mt-6 mb-16">
      <div className="h-fit w-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="w-full h-[300px] relative bg-gray-100">
          <SafetyImage
            clazz="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            src={product.images?.[0]}
            height={300}
            width={280}
          />

          <div className="absolute top-0 left-0 p-4 flex gap-2">
            <div className="w-[17px] h-[17px]">
              <ShoppingCart className="w-full h-full" />
            </div>
            <div className="w-[17px] h-[17px]">
              <Heart className="w-full h-full" />
            </div>
            <div className="w-[15px] h-[15px]">
              <Search className="w-full h-full" />
            </div>
          </div>
        </div>
        
        <div className="pt-4 pb-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-center">
            {product.name}
          </h3>
          <div className="flex gap-1 my-2">
            {product.price_variants?.map((variant, index) => (
              <div
                key={index}
                className="w-3.5 h-1 rounded-[10px]"
                style={{ backgroundColor: '#888' }}
              />
            ))}
          </div>
          <p className="text-sm font-normal text-gray-500">
            {product.unit}
          </p>
          <p className="text-sm font-normal mt-2 text-primary">
            {formatCurrency(product.unit_price)}
          </p>
          
          <div className="mt-4 w-full px-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-600">Số lượng:</span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 px-2 py-1.5 border rounded-lg text-center text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardFull;
