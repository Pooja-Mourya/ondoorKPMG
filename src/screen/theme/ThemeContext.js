import React, {createContext, useState, useEffect, useContext} from 'react';
import {light, dark} from './ThemeColor';
import {useColorScheme} from 'react-native';

export const ThemeContext = createContext({
  dark: false,
  color: light,
  themeFunction: () => {},
});

export const ThemeProvider = props => {
  const colorVariable = useColorScheme(); // 'dark' , 'light', 'null,
  const [isTheme, setIsTheme] = useState(false);

  useEffect(() => {
    setIsTheme(colorVariable === 'dark');
  }, [colorVariable]);

  const defaultTheme = {
    dark: isTheme,
    color: isTheme ? dark : light,
    themeFunction: val => setIsTheme(val === 'dark'),
  };
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useCustomHook = () => useContext(ThemeContext);
