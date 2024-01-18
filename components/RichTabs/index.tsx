import { useEffect, useState } from "react";
import { List, Trigger, Root, Content } from "@radix-ui/react-tabs";
import type {
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsProps,
} from "@radix-ui/react-tabs";
import cx from "classnames";
import { useRouter } from "next/router";

RichTabs.List = ({ className, ...rest }: TabsListProps) => {
  return (
    <List
      {...rest}
      className={cx(
        "flex flex-row items-center justify-start gap-8 p-0 -mb-1px",
        className
      )}
    />
  );
};

RichTabs.Trigger = ({ className, ...rest }: TabsTriggerProps) => {
  return (
    <Trigger
      {...rest}
      className={cx(
        "relative font-semibold dark:bg-neutral-900 bg-slate-50 text-sm border-l border-t border-r border-solid dark:border-gray-800 border-slate-200 rounded-tl-lg rounded-tr-lg flex flex-col items-center justify-between w-48 h-28 dark:aria-selected:bg-neutral-700 transition-all duration-300 aria-selected:bg-white aria-selected:border-b-white aria-selected:top-px",
        className
      )}
    />
  );
};

RichTabs.Content = ({ className, ...rest }: TabsContentProps) => {
  return (
    <Content
      {...rest}
      className={cx(
        "px-8 py-8 border border-solid dark:border-gray-800 border-slate-200  rounded-bl-lg rounded-br-lg rounded-tr-lg shadow-sm",
        className
      )}
    />
  );
};

export function RichTabs({
  children,
  className,
  orientation = "horizontal",
  ...rest
}: TabsProps) {
  let [tabValue, setTabValue] = useState(rest.defaultValue);
  const router = useRouter();
  const {
    query: { tab },
  } = router;

  useEffect(() => {
    setTabValue(
      Array.isArray(tab)
        ? tab[0]
        : typeof tab === "string" && tab.length > 0
        ? tab
        : rest.defaultValue
    );
  }, [tab]);

  function handleValueChanged(value: string) {
    setTabValue(value);
  }

  return (
    <Root
      className={cx("px-0 pt-4 m-0 rounded-lg mt-2", className)}
      orientation={orientation}
      {...rest}
      value={tabValue}
      onValueChange={handleValueChanged}
    >
      {children}
    </Root>
  );
}
