import React from "react";
import { FaLaptop, FaTablet, FaMobile } from "react-icons/fa";
import useWindowSize from "./hooks/useWindowSize";

const Header = ({ title }) => {
  const { width } = useWindowSize();
  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 760 ? <FaMobile /> : width < 960 ? <FaTablet /> : <FaLaptop />}
    </header>
  );
};

export default Header;
