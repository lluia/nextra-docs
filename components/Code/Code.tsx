import { useConfig } from "nextra-theme-docs"
import { useRouter } from 'next/router'
import { Tabs } from "nextra/components";
import React, { Children } from "react";

interface ChildrenProps {
  children: React.ReactElement;
}

Code.Next = NextJsCode;
Code.Svelte = SvelteCode;
Code.Solid = SolidCode;
Code.Express = ExpressCode;

const frameworks = {
  [NextJsCode.name]: "Next.js",
  [SvelteCode.name]: "Sveltekit",
  [SolidCode.name]: "SolidStart",
  [ExpressCode.name]: "Express",
};

export function Code({ children }: ChildrenProps) {
  const frameworkNames = Object.keys(frameworks);
  const config = useConfig()
  const router = useRouter()

  return (
    <Tabs items={Object.values(frameworks)}>
      {frameworkNames.map((f) => {
        const [child] = Children.toArray(children).filter(
          // @ts-expect-error
          (child) => child.type.name === f
        );
        return (
          child || (
            <Tabs.Tab>
              <p className="italic">
                {frameworks[f]} not documented yet. Help us by contributing <a className="underline" target="_blank" href={`${config.project.link}/edit/main/docs/pages${router.pathname}.mdx`}>here</a>.
              </p>
            </Tabs.Tab>
          )
        );
      })}
    </Tabs >
  );
}

function NextJsCode({ children }: ChildrenProps) {
  return <Tabs.Tab>{children}</Tabs.Tab>;
}

function SvelteCode({ children }: ChildrenProps) {
  return (
    <Tabs.Tab>
      {children || <p className="italic">Sveltekit not documented yet.</p>}
    </Tabs.Tab>
  );
}

function SolidCode({ children }: ChildrenProps) {
  return (
    <Tabs.Tab>
      {children || <p className="italic">SolidStart not documented yet.</p>}
    </Tabs.Tab>
  );
}

function ExpressCode({ children }: ChildrenProps) {
  return (
    <Tabs.Tab>
      {children || <p className="italic">Express not documented yet.</p>}
    </Tabs.Tab>
  );
}
