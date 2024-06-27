// 'use client';
// import { useEffect } from 'react';
// import useLocalStorage from './useLocalStorage';

// const useColorMode = () => {
//   const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

//   useEffect(() => {
//     const className = 'dark';
//     const bodyClass = window.document.body.classList;

//     colorMode === 'dark'
//       ? bodyClass.add(className)
//       : bodyClass.remove(className);
//   }, [colorMode]);

//   return [colorMode, setColorMode];
// };

// export default useColorMode;

// ColorModeContext.tsx
'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

interface ColorModeContextProps {
  colorMode: string;
  setColorMode: (mode: string) => void;
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(
  undefined
);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = (): [string, (mode: string) => void] => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return [context.colorMode, context.setColorMode];
};
