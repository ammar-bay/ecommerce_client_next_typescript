import "../styles/global.css";
import React, { useContext } from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { Store, StoreProvider } from "../utils/Store";
import { useRouter } from "next/router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { NextComponentType, NextPageContext } from "next";
import Cookies from "js-cookie";
import Unauthorized from "./unauthorized";

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth: {
      adminOnly: boolean;
      displayName: string;
    };
  };
};

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const { session, ...pageProp } = pageProps;

  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const authorized = Component.auth?.adminOnly
    ? user?.isAdmin && true
    : Component.auth && user && true;

  return (
    <>
      <StoreProvider>
        <PayPalScriptProvider
          options={{ "client-id": "test" }}
          deferLoading={true}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {Component.auth ? (
              authorized ? (
                <Component {...pageProp} />
              ) : (
                <Unauthorized admin={Component.auth?.adminOnly} />
              )
            ) : (
              <Component {...pageProp} />
            )}
          </ThemeProvider>
        </PayPalScriptProvider>
      </StoreProvider>
    </>
  );
} 
