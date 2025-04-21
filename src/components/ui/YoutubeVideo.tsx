import React, { useState, useEffect, useMemo } from 'react';

const YoutubeVideo = ({ src }: { src: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [src]);

  const videoIframe = useMemo(() => {
    if (!src) return null;

    return (
      <iframe
        className="absolute inset-0 w-full h-full rounded-lg"
        src={src}
        title="Product Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        onError={() => setHasError(true)}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    );
  }, [src, isLoading]);

  const errorContent = useMemo(() => (
    <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Video không khả dụng</p>
      </div>
    </div>
  ), []);

  const loadingSpinner = useMemo(() => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  ), []);

  if (!src) return null;
  if (hasError) return errorContent;

  return (
    <div className="relative w-full pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && loadingSpinner}
      {videoIframe}
    </div>
  );
};

export default React.memo(YoutubeVideo);
