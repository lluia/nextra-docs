//// @ts-expect-error
// import { reasons, SiteChecker } from "broken-link-checker";
// import { setFailed } from "@actions/core";
const { SiteChecker } = require("broken-link-checker");
const { setFailed } = require("@actions/core");

type TODO = any;
type Output = {
  errors: any[];
  links: any[];
  pages: any[];
  sites: any[];
};

// Main function that triggers link validation across .mdx files
async function brokenLinkChecker(): Promise<void> {
  const siteUrl =
    process.env.VERCEL_PREVIEW_URL ?? "https://authjs-nextra-docs.vercel.app";
  const output: Output = {
    errors: [],
    links: [],
    pages: [],
    sites: [],
  };

  const options = {
    excludeExternalLinks: true,
    excludedKeywords: [],
  };

  const siteChecker = new SiteChecker(options, {
    error: (error: TODO) => {
      // console.log({ error });
      output.errors.push(error);
    },
    link: (result: TODO, customData: TODO) => {
      if (result.broken && result.brokenReason === "HTTP_404") {
        console.log({ result, customData });
        output.links.push(result);
      }
    },
    page: (error: TODO, pageURL: TODO, customData: TODO) => {
      // console.log({ error, pageURL, customData });
      output.pages.push(error);
    },
    site: (error: TODO, siteURL: TODO, customData: TODO) => {
      // console.log({ error, siteURL, customData });
      output.sites.push(error);
    },
    end: () => {
      console.log({ output });
      if (output.links.length) {
        setFailed(`Found broken links`);
      }
    },
  });

  siteChecker.enqueue(siteUrl);
}

brokenLinkChecker();
