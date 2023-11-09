import React from "react";
import { ChildrenProps } from "../../utils/types";

export function Link({ children, ...rest }: ChildrenProps) {
  return (
    <a className="no-underline text-sky-600 font-medium" {...rest}>
      {children}
    </a>
  );
}
