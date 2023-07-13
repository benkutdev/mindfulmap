import { createGlobalStyle } from "styled-components";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: ${bebasNeue.style.fontFamily}; 
  }

  body {
    margin: 0;
    background-color: #FEF9E7;
  }
`;
