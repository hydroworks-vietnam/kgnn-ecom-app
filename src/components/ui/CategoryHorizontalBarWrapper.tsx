import { useEffect, useState } from 'react';
import CategoryHorizontalBar from './CategoryHorizontalBar';

export default function CategoryHorizontalBarWrapper() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith('/products')) {
      setShouldShow(true);
    }
  }, []);

  if (!shouldShow) return null;

  return <CategoryHorizontalBar />;
}