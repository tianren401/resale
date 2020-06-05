import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

const viewportContext = createContext({});

export const ViewportProvider = ({ children }) => {
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = useCallback(() => {
    setWidth(isClient ? window.innerWidth : undefined);
    setHeight(isClient ? window.innerHeight : undefined);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize, isClient]);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

ViewportProvider.propTypes = {
  children: PropTypes.any,
};

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);
  return { width, height };
};
