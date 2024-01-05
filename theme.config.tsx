import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Link } from "./components/Link/Link";
import { ChildrenProps } from "./utils/types";

const config: DocsThemeConfig = {
  logo: (
    <div className="flex flex-row items-center">
      <img src="/img/etc/logo-xs.webp" width="30" />
      <span className="ml-2 text-xl font-black" >
        Auth.js
      </span>
    </div>
  ),
  components: {
    a: (props: ChildrenProps) => <Link href="" {...props} />,
  },
  project: {
    link: "https://github.com/nextauthjs/next-auth",
  },
  darkMode: true,
  primaryHue: {
    light: 260,
    dark: 20,
  },

  toc: {
    extraContent: <span data-todo="potential spot for ad?"></span>,
    backToTop: true
  },
  banner: {
    text: (
      <>
        <a
          className="text-violet-400"
          target="_blank"
          rel="noopener noreferrer"
          href="https://next-auth.js.org"
        >
          NextAuth.js
        </a>{" "}
        is now Auth.js! 🎉 Authentication for the Web. Everyone included.
      </>
    ),
  },
  docsRepositoryBase: "https://github.com/nextauthjs/next-auth/docs",
  footer: {
    text: "☕️ Auth.js – spread love",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Auth.js",
      description: "Authentication for the Web.",
    }
  },
};

export default config;
