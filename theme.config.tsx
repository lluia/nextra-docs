import { DocsThemeConfig } from "nextra-theme-docs";
import { Link } from "@/components/Link";
import { ChildrenProps } from "@/utils/types";
import Footer from "@/components/Footer";

const config: DocsThemeConfig = {
  logo: (
    <div className="flex flex-row items-center">
      <img src="/img/etc/logo-xs.webp" width="30" />
      <span className="ml-2 text-xl font-black">Auth.js</span>
    </div>
  ),
  components: {
    a: (props: ChildrenProps) => <Link href="" {...props} />,
  },
  project: {
    link: "https://github.com/nextauthjs/next-auth",
  },
  darkMode: true,
  color: {
    hue: {
      light: 268,
      dark: 280,
    },
    saturation: {
      light: 100,
      dark: 50,
    },
  },
  navbar: {
    extraContent: (
      <div className="relative">
        <div className="github-counter">20k</div>
      </div>
    ),
  },
  head: (
    <>
      <link
        rel="icon"
        href="/favicon-32x32.png"
        sizes="32x32"
        type="image/png"
      />
      <link
        rel="icon"
        href="/favicon-16x16.png"
        sizes="16x16"
        type="image/png"
      />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:url" content="https://authjs.dev" />
      <meta property="og:title" content="Auth.js" />
      <meta property="og:description" content="Authentication for the Web" />
    </>
  ),
  toc: {
    extraContent: <span data-todo="potential spot for ad?"></span>,
    backToTop: true,
  },
  docsRepositoryBase: "https://github.com/nextauthjs/next-auth/docs",
  footer: {
    component: <Footer />,
  },
};

export default config;
