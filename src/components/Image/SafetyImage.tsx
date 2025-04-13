interface ImageProps {
  alt?: string;
  src?: string;
  clazz?: string;
  height?: number;
  width?: number;
}

const FALLBACK_IMG = '/assets/fallback-img.png';

const SafetyImage: React.FC<ImageProps> = ({
  alt,
  src,
  clazz = '', // Default to empty string to avoid undefined in className
  height = 64,
  width = 64,
}) => {
  // Use src if it's a valid string, otherwise fallback
  // const imageSrc = typeof src === 'string' && src ? src : FALLBACK_IMG;
  // Default alt to "Image" if not provided
  const imageAlt = alt || 'Image';

  return (
    <img
      src={src}
      alt={imageAlt}
      className={clazz}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
};

export default SafetyImage;
