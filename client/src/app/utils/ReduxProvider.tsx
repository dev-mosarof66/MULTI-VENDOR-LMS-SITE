'use client'
import React, { JSX, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store/redux";

function ReduxProvider({
  children,
}: JSX.IntrinsicAttributes & { children: ReactNode }): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
