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

const baseFrameWorks = {
  [NextCode.name]: "Next.js",
  [SvelteCode.name]: "Sveltekit",
  [SolidCode.name]: "SolidStart",
  [ExpressCode.name]: "Express",
};

const allFrameworks = {
  [NextCode.name]: "Next.js",
  [NextPagesCode.name]: "Next.js (Pages)",
  [SvelteCode.name]: "Sveltekit",
  [SolidCode.name]: "SolidStart",
  [ExpressCode.name]: "Express",
};

export function Code({ children }: ChildrenProps) {
  const router = useRouter();
  const childs = Children.toArray(children);
  const { project } = useThemeConfig();

  const withNextJsPages = childs.some(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (p) => p && p.type.name === NextPagesCode.name
  );

  const renderedFrameworks = withNextJsPages ? allFrameworks : baseFrameWorks;

  return (
    <Tabs items={Object.values(renderedFrameworks)}>
      {Object.keys(renderedFrameworks).map((f) => {
        const [child] = childs.filter(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          (c) => (c ? c.type.name === f : false)
        );

        return (
          child || (
            <Tabs.Tab key={f}>
              <p className="font-semibold bg-slate-100 p-6 rounded-lg">
                {renderedFrameworks[f]} not documented yet. Help us by
                contributing{" "}
                <a
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href={`${project.link}/edit/main/docs/pages${router.pathname}.mdx`}
                >
                  here
                </a>
                .
              </p>
            </Tabs.Tab>
          )
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
