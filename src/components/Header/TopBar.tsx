import { isCartOpen, totalCartQuantity } from '@/store/cart';
import { useStore } from '@nanostores/react';
import { CurrencyIcon, HeartIcon, LanguagesIcon, MailboxIcon, PhoneIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import CartDrawer from '../Drawer/CartDrawer';

const TopBar = () => {
  const $isCartOpen = useStore(isCartOpen);
  const $totalQuantity = useStore(totalCartQuantity);

  const toggleCart = () => {
    isCartOpen.set(!$isCartOpen);
  };

  const handleCloseCart = () => {
    isCartOpen.set(false);
  };

  const handleContinueShopping = () => {
    isCartOpen.set(false);
  };

  const handleProceedToCheckout = () => {
    isCartOpen.set(false);
  };

  return (
    <>
      <div className="bg-gradient w-full text-white px-2 sm:px-4">
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-4 py-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <MailboxIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-base">khongiannhanong@gmail.com</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-xs sm:text-base">(12345)67890</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguagesIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
            <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-pink-500" />
            <div className="relative" onClick={toggleCart}>
              <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-black" />
              {$totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {$totalQuantity > 99 ? '99+' : $totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        open={$isCartOpen}
        onClose={handleCloseCart}
        callPayment={handleProceedToCheckout}
        onContinueShopping={handleContinueShopping}
      />
    </>
  );
};

export default TopBar;