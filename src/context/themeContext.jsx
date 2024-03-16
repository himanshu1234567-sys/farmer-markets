import React from "react";
const ThemeContext = React.createContext(false);

const ThemeProvider = ({ children }) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <ThemeContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
