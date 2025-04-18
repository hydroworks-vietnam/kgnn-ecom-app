import { useMemo } from 'react';

const getEmbedLink = (link: string): string => {
  const pattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)(?:\?|$)/;
  const match = link.match(pattern);
  return match ? link : '';
}

export const useVideoSource = (videoLink: string) => {
  return useMemo(() => {
    if (!videoLink) return '';
    return getEmbedLink(videoLink);
  }, [videoLink]);
}; 