import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import SearchInput from "@/components/Input/SearchInput";

const menuList = [
  { name: 'Sản phẩm', link: '/products' },
  { name: 'Bài viết', link: '/blog' },
  { name: 'Liên hệ', link: '#' },
  { name: 'Về chúng tôi', link: '#' }
];

const TopNavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="w-full px-4 md:px-[10rem] py-2 flex items-center justify-between gap-4 bg-white">
      {/* Left Section: Logo */}
      <div className="text-sm md:text-md font-bold text-gradient cursor-pointer" onClick={() => window.location.href = '/'}>
        KHÔNG GIAN NHÀ NÔNG
      </div>

      {/* Right Section: Menu Items (Desktop) or Hamburger and Search (Mobile) */}
      <div className="flex items-center gap-4">
        {/* Menu Items (Visible on Desktop) */}
        <div className="hidden md:flex items-center gap-6 cursor-pointer">
          {menuList.map(item => (
            <a
              key={item.name}
              className="font-sm whitespace-nowrap text-slate-500 hover:text-primary"
              href={item.link}
            >
              {item.name}
            </a>
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
          {/* Overlay (Using relative positioning to avoid fixed scroll lock) */}
          <div
            className="md:hidden bg-black bg-opacity-50 z-40"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={toggleMenu}
          />

          {/* Menu Drawer (Using relative flow) */}
          <div
            className={`md:hidden w-full bg-white shadow-lg z-50 ${isMenuOpen ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {menuList.map(item => (
                <a
                  className="font-sm text-gray-500 cursor-pointer hover:text-primary hover:bg-slate-200 w-full text-center py-2"
                  key={item.name}
                  href={item.link}
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TopNavigationBar;