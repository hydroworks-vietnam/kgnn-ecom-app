import { HeartIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
import { Card, CardContent } from "./index";

interface ProductCardProps {
  id: number;
  name: string;
  code: string;
  price: string;
  image: string;
  colors: string[];
}

const ProductCard = ({ id, name, code, price, image, colors }: ProductCardProps) => {
  return (
    <div className="flex justify-center gap-6 mt-6 mb-16">
      <Card
        key={id}
        className='h-fit w-[270px] bg-white'
      >
        <div className='w-full h-[236px] relative'>
          <img
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            alt={name}
            src={image}
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />

          <div className="absolute top-0 left-0 p-4 flex gap-2">
            <ShoppingCartIcon className="w-[17px] h-[17px]" />
            <HeartIcon className="w-[17px] h-[17px]" />
            <SearchIcon className="w-[15px] h-[15px]" />
          </div>
        </div>        
        <CardContent className="pt-4 pb-6 flex flex-col items-center">
          <h3
            className={`text-lg font-bold`}
          >
            {name}
          </h3>
          <div className="flex gap-1 my-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-3.5 h-1 rounded-[10px]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p
            className='text-sm font-normal'
          >
            {code}
          </p>
          <p
            className='text-sm font-normal mt-2'>
            {price}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductCard