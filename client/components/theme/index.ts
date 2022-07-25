import { PaletteMode } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import { components } from "./Components";

const Colors = {
    DARK_BLUE: "#1C1259",
    LIGHT_PURPLE: "#CACAEA",
    PINK: "#EE4266",
    ORANGE: "#FF9B00",
    LIGHT_ORANGE: "#FFD28C",
    BLACK: "#000000",
};


const themes = (["light", "dark"] as PaletteMode[]).map((mode) =>
    createTheme({
        palette: {
            primary: {
                main: Colors.DARK_BLUE,
            },
            secondary: {
                main: Colors.ORANGE,
            },
            text: {},
        },

        typography: {
            fontFamily: `"IBM Plex Sans", sans-serif`,
            h1: { fontSize: "2.4em", fontFamily: "PlusJakartaSans" },
            h2: { fontSize: "2.1em", fontFamily: "PlusJakartaSans" },
            h3: { fontSize: "1.7em", fontFamily: "PlusJakartaSans" },
            h4: { fontSize: "1.4em", fontFamily: "PlusJakartaSans" },
            h5: { fontSize: "1.2em", fontFamily: "PlusJakartaSans" },
            h6: { fontSize: "1em", fontFamily: "PlusJakartaSans" },
            button: { textTransform: "none" },
        },
        components: {
            ...components,
            MuiCssBaseline: {
                styleOverrides: `
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url("/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf");
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: medium;
              font-display: swap;
              font-weight: 500;
              src: url("/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf");
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: bold;
              font-display: swap;
              font-weight: 700;
              src: url("/fonts/IBMPlexSans/IBMPlexSans-Bold.ttf");
            }
            @font-face {
              font-family: 'PlusJakartaSans';
              font-style: bold;
              font-display: swap;
              font-weight: 700;
              src: url("/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.woff");
            }
          `,
            },
        },
    })
);

export default {
    light: themes[0],
    dark: themes[1],
} as { [key in PaletteMode]: Theme };