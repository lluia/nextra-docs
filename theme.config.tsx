import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Link } from "./components/Link/Link";
import { ChildrenProps } from "./utils/types";

const config: DocsThemeConfig = {
  logo: (
    <div className="flex flex-row items-center">
      <img src="/img/etc/logo-xs.webp" width="30" />
      <span
        className="font-black text-xl"
        style={{ marginLeft: "8px", color: "#334155" }}
      >
        Auth.js
      </span>
    </div>
  ),
  components: {
    a: (props: ChildrenProps) => <Link {...props} />,
  },
  darkMode: false,
  project: {
    link: "https://github.com/nextauthjs/next-auth",
  },
  docsRepositoryBase: "https://github.com/nextauthjs/next-auth",
  footer: {
    text: "☕️ Auth.js – spread love",
  },
};

export default config;
