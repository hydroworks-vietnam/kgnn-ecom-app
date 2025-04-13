import { useIsMobile } from '@/hooks/useViewportDetector';
import MobileProductList from '@/components/ui/MobileProductList';
import DesktopProductList from '@/components/ui/DesktopProductList';

const ProductList = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProductList /> : <DesktopProductList />
}

export default ProductList;
