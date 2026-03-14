import { memo } from 'react';
import { GalleryHorizontalEnd } from 'lucide-react';

interface ImageGalleryIndicatorProps {
  currentIndex: number;
  totalImages: number;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const positionClasses = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

const ImageGalleryIndicator = memo(({ currentIndex, totalImages, className = '', position = 'top-left' }: ImageGalleryIndicatorProps) => {
  return (
    <div
      className={`absolute ${positionClasses[position]} bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1 ${className}`}
    >
      <GalleryHorizontalEnd className="w-4 h-4" />
      <span>{currentIndex + 1}/{totalImages}</span>
    </div>
  );
});

export default ImageGalleryIndicator;
