import "./global.css";
import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useMemo } from "react";
import { TamaguiProvider } from "tamagui";

import config from "../../tamagui.config";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useRootTheme();

  const contents = useMemo(() => {
    return <Component {...pageProps} />;
  }, [Component, pageProps]);

  return (
    <>
      <Head>
        <title>M. Nindra Zaka</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="M. Nindra Zaka" />
        <meta name="robots" content="index, follow" />
      </Head>
      <NextThemeProvider
        onChangeTheme={(theme) => {
          if (theme === "light" || theme === "dark") setTheme(theme);
        }}
      >
        <TamaguiProvider
          config={config}
          disableInjectCSS
          disableRootThemeClass
          defaultTheme={theme}
        >
          {contents}
        </TamaguiProvider>
      </NextThemeProvider>
    </>
  );
}
