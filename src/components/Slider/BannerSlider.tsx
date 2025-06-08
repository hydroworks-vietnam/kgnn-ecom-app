import { useEffect, useState } from "react";
import { bannerApi } from "@/services/imageService";
import { Dot } from "@/components/ui/Dot";
import { NavigationArrow } from "@/components/ui/NavigationArrow";
import { cn } from "@/utils/helpers";

const BannerSlider = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    let intervalId: number;
    if (banners.length > 0) {
      intervalId = window.setInterval(nextSlide, 5000);
    }
    return () => window.clearInterval(intervalId);
  }, [banners.length]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannerApi.getAllBanners('banner');
        setBanners(response);
        setIsLoading(false);
      } catch (err) {
        setError("Không thể tải hình ảnh");
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (isLoading) {
    return <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />;
  }

  if (error || banners.length === 0) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Chưa có banner</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-lg">
      <div
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="absolute inset-y-0 left-4 flex items-center">
        <NavigationArrow direction="left" onClick={prevSlide} />
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center">
        <NavigationArrow direction="right" onClick={nextSlide} />
      </div>
    </div>
  );
};

export default BannerSlider;