import { useState, useEffect } from 'react';
import { Home, Package, FileText, ShoppingCart, Phone } from 'lucide-react';
import { useLocation, Link } from 'react-router';
import { useStore } from '@nanostores/react';
import { isCartOpen, totalCartQuantity } from '@/store/cart';

const MobileBottomNav = () => {
  const location = useLocation();
  const $totalQuantity = useStore(totalCartQuantity);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Sản phẩm', path: '/products', icon: Package },
    { name: 'Bài viết', path: '/blog', icon: FileText },
    { name: 'Giỏ hàng', path: 'cart', icon: ShoppingCart, isCart: true },
    { name: 'Liên hệ', path: '/contact', icon: Phone },
  ];

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isCartOpen.set(true);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t border-slate-200 z-50 px-4 py-2">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.isCart) {
            return (
              <button
                key={item.name}
                onClick={handleCartClick}
                className="flex flex-col items-center gap-1 relative group"
              >
                <div className={`p-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10' : 'group-hover:bg-slate-100'}`}>
                  <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                  {mounted && $totalQuantity > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                      {$totalQuantity}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => isCartOpen.set(false)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={`p-1 rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10' : 'group-hover:bg-slate-100'}`}>
                <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-primary' : 'text-slate-500'}`} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
