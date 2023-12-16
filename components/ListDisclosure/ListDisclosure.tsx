import React, { useState } from "react";
import { useListDisclosure } from "./useListDisclosure";
import cx from "classnames";

interface Props {
  children: React.ReactElement[];
  limit: number;
  className?: string;
}

export function ListDisclosure({ children, limit, className = "" }: Props) {
  const { displayLimit, handleCollapseAll, handleDisplayMore } =
    useListDisclosure(limit);

  const rendered = children.slice(0, displayLimit);
  const isAllDisplayed = displayLimit >= children.length;

  return (
    <>
      <div
        className={cx(
          "grid gap-x-4 gap-y-4 grid-cols-4 w-full my-4",
          className
        )}
      >
        {rendered}
      </div>
      <button
        className="font-semibold text-sm bg-slate-900 text-white rounded-full shadow-md h-8 w-24 text-xs"
        onClick={isAllDisplayed ? handleCollapseAll : handleDisplayMore}
      >
        {isAllDisplayed ? "Collapse all" : "Show more"}
      </button>
    </>
  );
}
