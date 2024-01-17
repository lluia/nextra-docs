import React, { useEffect, useState } from "react";
import { addClassToHast, codeToHtml } from "shikiji";
import { FrameWork, frameworkDetails } from "utils/frameworks";
import { FileCode } from "@phosphor-icons/react";
import styles from "./styles.module.css";

async function renderNextJs(framework: FrameWork) {
  return codeToHtml(frameworkDetails[framework].code, {
    lang: "typescript",
    theme: "material-theme-darker",
    transformers: [
      {
        pre(node) {
          addClassToHast(node, `!p-4 rounded-lg ${styles["example-height"]}`);
        },
      },
    ],
  });
}

export function FrameworkExamples() {
  const [active, setActive] = useState<FrameWork>(FrameWork.NextJs);
  const [example, setExample] = useState("");

  useEffect(() => {
    renderNextJs(active).then((code) => setExample(code));
  }, [active]);

  return (
    <div className="w-full flex flex-row flex-wrap max-w-5xl items-start justify-between h-">
      <div className="flex flex-row flex-wrap justify-start items-center gap-4 w-1/3 mx-auto m-0">
        {Object.keys(frameworkDetails).map((f: FrameWork) => {
          const desc = frameworkDetails[f];
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="flex w-32 h-32 flex-col flex-wrap gap-2 items-center justify-center rounded-lg border-4 border-solid border-slate-200 p-4 aria-selected:border-indigo-400"
              aria-selected={f === active}
            >
              <img src={desc.logo} width={desc.logoW} />
              <div className="m-0 text-sm font-bold">{desc.title}</div>
            </button>
          );
        })}
      </div>
      <aside className="!w-2/3">
        <div
          className="rounded-lg m-0 mb-2"
          dangerouslySetInnerHTML={{ __html: example }}
        />
        <a
          className="w-full flex flex-row items-center gap-2 justify-end cursor-pointer"
          target="_blank"
          href={frameworkDetails[active].example}
        >
          <FileCode fontSize="2rem" className="inline" />
          <span>
            Check the{" "}
            <span className="no-underline text-purple-700 font-medium">
              {frameworkDetails[active].title} example app
            </span>
          </span>
        </a>
      </aside>
    </div>
  );
}
