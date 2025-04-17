import type { IProduct } from "@/types/product";
import { formatCurrency } from "@/utils/helpers";
import { ShoppingCartIcon, Heart, Search } from "lucide-react";

const ProductCardSlider = ({
  slidesPerView,
  openDetail,
  item
}: { slidesPerView: number, openDetail: (item: IProduct) => void, item: IProduct }) => {
  // Calculate width: 3 slides for mobile (w-1/3), 6 slides for desktop (w-1/6)
  const widthClass = slidesPerView === 3 ? "w-1/3" : "w-1/6";

  return (
    <>
      <div className={`${widthClass} px-1 sm:px-2 mb-4 sm:mb-6 min-w-0 flex-shrink-0 cursor-pointer`}
        onClick={() => openDetail(item)}
      >
        <div className="relative h-fit border border-gray-200 rounded-lg shadow-md bg-white transition-shadow hover:shadow-lg">
          {/* Product Image Container */}
          <div className="bg-gray-50 rounded-lg flex justify-center items-center mb-2 sm:mb-3 overflow-hidden">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-full h-36 sm:h-48 object-contain transition-transform group-hover:scale-105"
            />

            {/* Quick action buttons that appear on hover */}
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white rounded-full p-1 hover:bg-gray-100 shadow-md">
                <ShoppingCartIcon className="w-4 h-4 text-blue-950" />
              </button>
              <button className="bg-white rounded-full p-1 hover:bg-gray-100 shadow-md">
                <Heart className="w-4 h-4 text-blue-950" />
              </button>
              <button className="bg-white rounded-full p-1 hover:bg-gray-100 shadow-md">
                <Search className="w-4 h-4 text-blue-950" />
              </button>
            </div>

            {/* Sale tag */}
            {item.discount_price > 0 && (
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-primary text-white text-xs font-semibold py-0.5 px-1 sm:px-2 rounded">
                SALE
              </div>
            )}
          </div>

          <div className="text-primary text-center mb-1 sm:mb-2 text-sm sm:text-base">{item.name}</div>
          {/* Product Info */}
          <div className="text-center text-xs sm:text-sm pb-3 sm:pb-4">
            <div className="flex justify-center items-center gap-1 sm:gap-2">
              <p className="font-semibold text-blue-900">
                {formatCurrency(item.unit_price)}
              </p>
              {item.discount_price > 0 && (
                <p className="text-red-500 line-through">
                  {formatCurrency(item.unit_price - item.discount_price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardSlider;