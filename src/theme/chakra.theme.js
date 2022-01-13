import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  fonts: {
    heading: "Lato",
    body: "Lato",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "gray.700")(props),
        pt: { base: "0", md: "0" },
      },
    }),
  },
  components: {
    Box: {
      variants: {
        body: (props) => ({ // real body color
          bg: mode("white", "gray.700")(props),
        }),
      },
    },
    VStack: {
      variants: {
        post: (props) => ({
          bg: mode("white", "white")(props),
        }),
      },
    },
    Button: {
      // defaultProps: {
      //   colorScheme: "blue",
      // },
      variants: {
        primary: (props) => ({
          bg: mode("blue.400", "blue.600")(props),
          color: "white",
          _hover: {
            bg: mode("blue.500", "blue.700")(props),
          },
        }),
        secondary: (props) => ({
          bg: mode("gray.500", "gray.500")(props),
          color: "white",
          _hover: {
            bg: mode("gray.600", "gray.600")(props),
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
