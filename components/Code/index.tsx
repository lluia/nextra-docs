import { useThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Tabs } from "nextra/components";
import React, { Children } from "react";

interface ChildrenProps {
  children: React.ReactElement;
}

Code.Next = NextCode;
Code.NextPages = NextPagesCode;
Code.Svelte = SvelteCode;
Code.Solid = SolidCode;
Code.Express = ExpressCode;

const baseFrameworks = {
  [NextCode.name]: "Next.js",
  [SvelteCode.name]: "SvelteKit",
  [ExpressCode.name]: "Express",
  [SolidCode.name]: "SolidStart",
};

const allFrameworks = {
  [NextCode.name]: "Next.js",
  [NextPagesCode.name]: "Next.js (Pages)",
  [SvelteCode.name]: "SvelteKit",
  [SolidCode.name]: "SolidStart",
  [ExpressCode.name]: "Express",
};

export function Code({ children }: ChildrenProps) {
  const router = useRouter();
  const {
    query: { tab },
  } = router;
  const childs = Children.toArray(children);
  const { project } = useThemeConfig();

  const withNextJsPages = childs.some(
    // @ts-expect-error: Hacky dynamic child wrangling
    (p) => p && p.type.name === NextPagesCode.name
  );

  const renderedFrameworks = withNextJsPages ? allFrameworks : baseFrameworks;

  const findIndexOfTab = (tab: string): number => {
    if (!tab) return 0;
    const foundKey = Object.values(renderedFrameworks).findIndex(
      // TODO: Maybe slugify for better results?
      (f) => f.toLowerCase().replace(".", "") === tab
    );
    return foundKey;
  };

  return (
    <Tabs
      items={Object.values(renderedFrameworks)}
      selectedIndex={findIndexOfTab(tab as string)}
    >
      {Object.keys(renderedFrameworks).map((f) => {
        // @ts-expect-error: Hacky dynamic child wrangling
        const child = childs.find((c) => c?.type?.name === f);

        // @ts-expect-error: Hacky dynamic child wrangling
        return Object.keys(child?.props ?? {}).length ? (
          child
        ) : (
          <Tabs.Tab key={f}>
            <p className="p-6 font-semibold rounded-lg bg-slate-100 dark:bg-neutral-950">
              {renderedFrameworks[f]} not documented yet. Help us by
              contributing{" "}
              <a
                className="underline"
                target="_blank"
                href={`${project.link}/edit/main/docs/pages${router.pathname}.mdx`}
                rel="noreferrer"
              >
                here
              </a>
              .
            </p>
          </Tabs.Tab>
        );
      })}
    </Tabs>
  );
}

function NextPagesCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}

function NextCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}

function SvelteCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}

function SolidCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}

function ExpressCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}
