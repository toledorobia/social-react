import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        pt: { base: "0", md: "0" },
      },
    },
  },
  components: {
    Button: {
      // defaultProps: {
      //   colorScheme: "blue",
      // },
      variants: {
        primary: () => ({
          bg: "blue.400",
          color: "white",
          _hover: {
            bg: "blue.500",
          },
        }),
        secondary: () => ({
          bg: "gray.500",
          color: "white",
          _hover: {
            bg: "gray.600",
          },
        }),
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
    Link: {
      variants: {
        // you can name it whatever you want
        primary: ({ colorScheme = "blue" }) => ({
          color: `${colorScheme}.500`,
          _hover: {
            color: `${colorScheme}.400`,
          },
        }),
        nav: (props) => ({
          px: 2,
          py: 1,
          rounded: "md",
          _hover: {
            textDecoration: "none",
            bg: mode("gray.200", "gray.700")(props),
          },
        }),
      },
      defaultProps: {
        // you can name it whatever you want
        // variant: "primary",
      },
    },
  },
});

export default theme;
