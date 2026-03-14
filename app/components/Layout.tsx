import { useStore } from "@nanostores/react";
import { isCartOpen } from "@/store/cart";
import Header from "./Header";
import PageFooter from "./Footer/PageFooter";
import FloatingCart from "./Button/FloatingCart";
import { useLocation } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const $isCartOpen = useStore(isCartOpen);
  const location = useLocation();

  const handleCartClick = () => {
    isCartOpen.set(!$isCartOpen);
  };

  const shouldShowFloatingCart = location.pathname === '/products';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 px-4 md:px-8 lg:px-36 pb-10 overflow-x-hidden">
        {children}
      </main>
      <PageFooter />
      {shouldShowFloatingCart && <FloatingCart onCartClick={handleCartClick} />}
    </div>
  );
};

export default Layout;
