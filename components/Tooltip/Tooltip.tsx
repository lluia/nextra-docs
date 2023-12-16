import React from "react";
import { Tooltip as ArkTooltip } from "@ark-ui/react";
import { ChildrenProps } from "../../utils/types";

interface Props {
  label: string;
  children: React.ReactNode;
}

export function Tooltip({ label, children }: Props) {
  return (
    <ArkTooltip.Root openDelay={0} lazyMount unmountOnExit>
      <ArkTooltip.Trigger>{children}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content className="bg-purple-100 rounded-lg text-fuchsia-900 px-4 py-2 text-sm max-w-xs text-center shadow-md  border">
          {label}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  );
}
