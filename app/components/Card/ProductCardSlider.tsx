import { useState } from 'react';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCart, Plus, Heart, Search } from 'lucide-react';

interface ProductCardSliderProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const ProductCardSlider = ({ product, onAddToCart }: ProductCardSliderProps) => {
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
    <div className="flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="w-full aspect-square relative bg-gray-100">
        <SafetyImage
          clazz="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          src={product.images?.[0]}
          height={400}
          width={400}
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
      
      <div className="w-full p-4 flex flex-col items-center">
        <h3 className="text-base font-bold text-center">
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
        <p className="text-xs font-normal text-gray-500">
          {product.unit}
        </p>
        <p className="text-sm font-bold mt-2 text-primary">
          {formatCurrency(product.unit_price)}
        </p>
        
        <div className="mt-4 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-600">Số lượng:</span>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 px-2 py-1.5 border rounded-lg text-center text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSlider;
