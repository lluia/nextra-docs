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
    link: "https://github.com/shuding/nextra-docs-template",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/shuding/nextra-docs-template",
  footer: {
    text: "Nextra Docs Template",
  },
};

export default config;
