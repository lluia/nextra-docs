import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Link } from "./components";
import { ChildrenProps } from "./utils/types";

const config: DocsThemeConfig = {
  logo: <img src="/img/logo-sm.png" width="30" />,
  components: {
    a: (props: ChildrenProps) => <Link {...props} />,
  },
  project: {
    link: "https://github.com/nextauthjs/next-auth",
  },
  docsRepositoryBase: "https://github.com/nextauthjs/next-auth",
  footer: {
    text: "☕️ Auth.js – spread love",
  },
};

export default config;
