import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import SearchInput from "@/components/Input/SearchInput";

const menuList = ['Sản phẩm', 'Kinh nghiệm', 'Dịch vụ', 'Liên hệ', 'Về chúng tôi'];

const TopNavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="w-full px-4 md:px-[10rem] py-4 flex items-center justify-between gap-4 relative">
      {/* Left Section: Logo */}
      <div className="text-sm md:text-md font-bold text-gradient cursor-pointer" onClick={() => window.location.href = '/'}>
        KHÔNG GIAN NHÀ NÔNG
      </div>

      {/* Right Section: Menu Items (Desktop) or Hamburger and Search (Mobile) */}
      <div className="flex items-center gap-4">
        {/* Menu Items (Visible on Desktop) */}
        <div className="hidden md:flex items-center gap-6 cursor-pointer">
          {menuList.map(item => (
            <span className="font-sm whitespace-nowrap text-slate-500" key={item}>
              {item}
            </span>
          ))}
        </div>

        {/* Search Icon and Hamburger (Mobile) */}
        <div className="flex items-center gap-4">
          <SearchInput />
          {/* Hamburger Icon (Visible on Mobile) */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? (
                <XIcon className="w-6 h-6 text-slate-500" />
              ) : (
                <MenuIcon className="w-8 h-6 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Menu Overlay and Drawer */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMenu}
            />

            {/* Menu Drawer */}
            <div
              className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
              <div className="flex flex-col items-center gap-4 py-4">
                {menuList.map(item => (
                  <span
                    className="font-sm text-gray-500 cursor-pointer"
                    key={item}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default TopNavigationBar;