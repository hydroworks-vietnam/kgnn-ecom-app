import React, { useState, useEffect } from 'react';

const IframeVideo = ({ src }: { src: string }) => {
  const [height, setHeight] = useState(window.innerWidth >= 960 ? 300 : 120);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerWidth >= 960 ? 300 : 120);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!src) return null;

  return (
    <iframe
      width="100%"
      height={height}
      src={src}
      title="Lounge Sofa Demo"
      referrerPolicy="strict-origin-when-cross-origin"
      frameBorder="0"
      allowFullScreen
      className="rounded-lg"
    />
  );
};

const YoutubeVideo = React.memo(IframeVideo);
export default YoutubeVideo;
