import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjE2QzE0IDE3LjEgMTMuMSAxOCA5IDE4QzQuOSAxOCA0IDE3LjEgNCAxNlY0QzQgMi45IDQuOSAyIDYgMkgxOEMxOC45IDIgMjAgMi45IDIwIDRWMTZDMTggMTcuMSAxNy4xIDE4IDE2IDE4SDEyQzEwLjkgMTggMTAgMTcuMSAxMCAxNlY0QzEwIDIuOSAxMC45IDIgMTIgMlpNMTIgN0MxMS40NSA3IDEwLjk1IDcuNDQgMTAuNSA4QzEwLjA1IDguNTYgOSA5LjQ1IDkgMTBWMTRDOSA5LjU1IDkuNDUgMTAgMTAgMTBIMTRDMTQuNTUgMTAgMTUgOS41NSAxNSA5VjEwQzE1IDkuNDUgMTQuNTUgOC45NSAxNC4xIDguNUMxMy42NSA4LjA0IDEzLjA1IDggMTIgOFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
