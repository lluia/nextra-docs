import React, { useEffect, useState } from "react";
import { addClassToHast, codeToHtml } from "shikiji";
import { Framework, frameworkDetails } from "utils/frameworks";
import { FileCode } from "@phosphor-icons/react";
import styles from "./styles.module.css";

async function renderNextJs(framework: Framework) {
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
  const [active, setActive] = useState<Framework>(Framework.NextJs);
  const [example, setExample] = useState("");

  useEffect(() => {
    // eslint-disable-next-line no-console
    renderNextJs(active).then((code) => setExample(code)).catch(err => console.error(err));
  }, [active]);

  return (
    <div className="flex flex-row flex-wrap justify-between items-start w-full max-w-5xl h-">
      <div className="flex flex-row flex-wrap gap-4 justify-start items-center m-0 mx-auto w-1/3">
        {Object.keys(frameworkDetails).map((f: Framework) => {
          const desc = frameworkDetails[f];
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="flex flex-col flex-wrap gap-2 justify-center items-center p-4 w-32 h-32 rounded-lg border-4 border-solid border-slate-200 aria-selected:border-indigo-400"
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
          className="m-0 mb-2 rounded-lg"
          dangerouslySetInnerHTML={{ __html: example }}
        />
        <a
          className="flex flex-row gap-2 justify-end items-center w-full cursor-pointer"
          target="_blank"
          href={frameworkDetails[active].example}
          rel="noreferrer"
        >
          <FileCode fontSize="2rem" className="inline" />
          <span>
            Check the{" "}
            <span className="font-medium text-purple-700 no-underline">
              {frameworkDetails[active].title} example app
            </span>
          </span>
        </a>
      </aside>
    </div>
  );
}
