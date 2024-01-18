import React, { useEffect, useState } from "react";
import { addClassToHast, codeToHtml } from "shikiji";
import { Framework, frameworkDetails } from "utils/frameworks";
import { RichTabs } from "@/components/RichTabs";
import Image from "next/image";
import SvelteKit from "../../public/img/etc/sveltekit.svg";
import SolidStart from "../../public/img/etc/solidstart.svg";
import NextJs from "../../public/img/etc/nextjs.svg";

async function renderNextJs(framework: Framework) {
  return codeToHtml(frameworkDetails[framework].code, {
    lang: "ts",
    theme: "rose-pine",
    transformers: [
      {
        pre(node) {
          addClassToHast(node, "w-full h-full !p-4 rounded-md");
        },
      },
    ],
  });
}

export function FrameworkExamples() {
  const [active, setActive] = useState<Framework>(Framework.NextJs);
  const [example, setExample] = useState("");

  useEffect(() => {
    renderNextJs(active).then((code) => setExample(code));
  }, [active]);

  function handleTabChange(value: Framework) {
    console.log("tab", value);
    setActive(value);
  }

  return (
    <div className="flex justify-center w-full">
      <RichTabs
        onTabChange={handleTabChange}
        orientation="vertical"
        defaultValue="nextjs"
        className="flex"
      >
        <RichTabs.List className="flex flex-col justify-start p-2 mr-4 space-y-2 bg-white rounded-xl shadow-md dark:bg-neutral-950">
          <RichTabs.Trigger
            value="nextjs"
            orientation="vertical"
            className="!border-0 aria-selected:!bg-violet-600/40 !h-32 !w-32 flex-1 p-4 rounded-md focus:outline-none transition-all duration-300"
          >
            <div className="flex flex-col justify-center items-center h-full">
              <Image width="64" src={NextJs} alt="Next.js Logo" />
            </div>
          </RichTabs.Trigger>
          <RichTabs.Trigger
            value="sveltekit"
            orientation="vertical"
            className="!border-0 aria-selected:!bg-violet-600/40 !h-32 !w-32 flex-1 p-4 rounded-md focus:outline-none transition-all duration-300"
          >
            <div className="flex flex-col justify-center items-center h-full">
              <Image width="64" src={SvelteKit} alt="Next.js Logo" />
            </div>
          </RichTabs.Trigger>
          <RichTabs.Trigger
            value="solidstart"
            orientation="vertical"
            className="!border-0 aria-selected:!bg-violet-600/40 !h-32 !w-32 flex-1 p-4 rounded-md focus:outline-none transition-all duration-300"
          >
            <div className="flex flex-col justify-center items-center h-full">
              <Image width="64" src={SolidStart} alt="Next.js Logo" />
            </div>
          </RichTabs.Trigger>
        </RichTabs.List>
        <div className="w-[clamp(20rem,_50vw,_40rem)] p-2 dark:bg-neutral-950 bg-white rounded-xl shadow-md">
          <RichTabs.Content
            value="nextjs"
            className="h-full rounded-md"
            tabIndex={-1}
          >
            <div
              className="w-full h-full"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: example }}
            />
          </RichTabs.Content>
          <RichTabs.Content value="sveltekit" className="h-full">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: example }}
            />
          </RichTabs.Content>
          <RichTabs.Content value="solidstart" className="h-full">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: example }}
            />
          </RichTabs.Content>
        </div>
      </RichTabs>
    </div>
  );
}
