import SearchInput from "@/components/Input/SearchInput";

const menuList = [
  { name: 'Sản phẩm', link: '/products' },
  { name: 'Bài viết', link: '/blog' },
  { name: 'Về chúng tôi', link: '/about-us' },
  { name: 'Liên hệ', link: '/contact' },
];

const TopNavigationBar = () => {

  return (
    <div className="w-full px-4 md:px-[10rem] py-2 flex items-center justify-between gap-4 bg-white">
      <div className="text-sm md:text-md font-bold text-gradient cursor-pointer" onClick={() => window.location.href = '/'}>
        KHÔNG GIAN NHÀ NÔNG
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 cursor-pointer">
          {menuList.map(item => (
            <a
              key={item.name}
              className="font-sm whitespace-nowrap text-slate-500 hover:bg-primary hover:text-white rounded-full px-3 py-1 transition-all"
              href={item.link}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
