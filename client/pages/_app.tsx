import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "@/components/theme";
import { CssBaseline, PaletteMode } from "@mui/material";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import { Layout } from "@/components/layout";
import { HeadMeta } from "@/components/head";
import { wrapper } from "redux/store";

type GetLayout = (page: ReactNode) => ReactNode;

// eslint-disable-next-line @typescript-eslint/ban-types
type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  const [selectedTheme, setSelectedTheme] =
    React.useState<PaletteMode>("light");
  const getLayout = Component.getLayout || ((page) => page);

  const handleTheme = () => {
    setSelectedTheme(
      (window?.localStorage?.getItem("theme") === "dark"
        ? "dark"
        : "light") as PaletteMode
    );
  };

  React.useEffect(handleTheme, []);

  const handleChangeTheme = () => {};
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme[selectedTheme]}>
        <React.Fragment>
          <Head>
            <HeadMeta />
          </Head>
          <CssBaseline/>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </React.Fragment>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default wrapper.withRedux(App);
