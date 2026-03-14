interface ImageProps {
  alt?: string;
  src?: string;
  clazz?: string;
  height?: number;
  width?: number;
}

const FALLBACK_IMG = '/images/fallback-img.jpg';

const SafetyImage: React.FC<ImageProps> = ({
  alt,
  src,
  clazz = '',
}) => {
  const imageAlt = alt || 'Image';

  return (
    <img
      src={src}
      alt={imageAlt}
      className={clazz || 'w-full h-full object-cover'}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
};

export default SafetyImage;
