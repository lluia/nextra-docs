import { Tabs } from "nextra/components";
import React, { Children } from "react";

interface ChildrenProps {
  children: React.ReactElement;
}

Code.Next = NextJsCode;
Code.Svelte = SvelteCode;
Code.Solid = SolidCode;

const frameworks = {
  [NextJsCode.name]: "Next.js",
  [SvelteCode.name]: "Sveltekit",
  [SolidCode.name]: "SolidStart",
};

export function Code({ children }: ChildrenProps) {
  const frameworkNames = Object.keys(frameworks);

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
              <p className="italic">{frameworks[f]} not documented yet.</p>
            </Tabs.Tab>
          )
        );
      })}
    </Tabs>
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
