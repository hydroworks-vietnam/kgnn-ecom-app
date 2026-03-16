import { isCartOpen, totalCartQuantity } from '@/store/cart';
import { useStore } from '@nanostores/react';
import { HeartIcon, LanguagesIcon, MailIcon, PhoneIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import CartDrawer from '../Drawer/CartDrawer';
import { useEffect, useState } from 'react';

const TopBar = () => {
  const $isCartOpen = useStore(isCartOpen);
  const $totalQuantity = useStore(totalCartQuantity);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsCheckoutPage(window.location.pathname === '/checkout');
  }, []);

  const toggleCart = () => {
    isCartOpen.set(!$isCartOpen);
  };

  const handleCloseCart = () => {
    isCartOpen.set(false);
  };

  const handleContinueShopping = () => {
    isCartOpen.set(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-yellow-300 w-full text-white px-4 sm:px-6 py-1.5">
        <div className="flex items-center justify-between max-w-7xl mx-auto space-x-4">
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1.5">
              <MailIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">khongiannhanong@gmail.com</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <PhoneIcon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">098 125 0725</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguagesIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-pink-500" />
            {!isCheckoutPage && (
              <div className="relative" onClick={toggleCart}>
                <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
                {mounted && $totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {$totalQuantity > 99 ? '99+' : $totalQuantity}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isCheckoutPage && (
        <CartDrawer
          open={$isCartOpen}
          onClose={handleCloseCart}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </>
  );
};

export default TopBar;
