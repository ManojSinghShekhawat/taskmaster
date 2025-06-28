import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    heading: "#121417", // nested inside brand
  },
};
const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
};
const theme = extendTheme({ colors, fonts });
export default theme;
