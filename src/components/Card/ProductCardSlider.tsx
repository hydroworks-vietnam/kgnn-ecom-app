import React from 'react';
import { Card, CardContent } from "./index";
import { ShoppingCartIcon, Heart, Search } from "lucide-react";

interface ProductCardSliderProps {
  id: number;
  name: string;
  code: string;
  price: string;
  image: string;
  isHighlighted?: boolean;
  colors: string[];
  slidesPerView: number;
}

const ProductCardSlider = ({ 
  id, 
  name, 
  code, 
  price, 
  image, 
  isHighlighted, 
  colors,
  slidesPerView 
}: ProductCardSliderProps) => {
  // Calculate width based on slides per view (2 for mobile, 4 for desktop)
  const widthClass = slidesPerView === 2 ? 'w-1/2' : 'w-1/4';
  
  return (
    <div className={`${widthClass}`}>
      <div className='rounded-lg transition-shadow h-full relative'>
        {/* Product Image */}
        <div className="flex justify-center mb-4 h-[180px] items-center">
          <img
            src={image}
            alt={name}
            className="max-h-[160px] object-contain transition-transform hover:scale-105"
          />
        </div>
        
        {/* Action buttons that appear on hover */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white rounded p-1 hover:bg-gray-100">
            <ShoppingCartIcon className="w-4 h-4 text-blue-950" />
          </button>
          <button className="bg-white rounded p-1 hover:bg-gray-100">
            <Heart className="w-4 h-4 text-blue-950" />
          </button>
          <button className="bg-white rounded p-1 hover:bg-gray-100">
            <Search className="w-4 h-4 text-blue-950" />
          </button>
        </div>
        
        {/* View Details Button (conditionally rendered) */}
        {isHighlighted && (
          <div className="absolute bottom-[70px] left-0 right-0 flex justify-center">
            <button className="bg-[#08D15F] text-white text-xs py-1 px-3 rounded">
              View Details
            </button>
          </div>
        )}
        
        {/* Product Information */}
        <div className="text-center">
          <h3 className={`font-bold text-sm ${isHighlighted ? 'text-white' : 'text-[#151875]'}`}>
            {name}
          </h3>
          
          {/* Color Options */}
          <div className="flex justify-center gap-1 my-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Product Code */}
          <p className={`text-xs font-medium mt-1 ${isHighlighted ? 'text-white' : 'text-[#151875]'}`}>
            Code · {code}
          </p>
          
          {/* Price */}
          <p className={`text-sm font-semibold mt-1 ${isHighlighted ? 'text-white' : 'text-[#151875]'}`}>
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSlider; 