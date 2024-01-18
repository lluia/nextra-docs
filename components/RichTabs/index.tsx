import { useEffect, useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import cx from "classnames";
import { styles } from "./styles";
import { useRouter } from "next/router";

RichTabs.TabList = function TabList({
  className,
  ...p
}: RadixTabs.TabsListProps) {
  return <RadixTabs.List {...p} className={cx(styles.tablist, className)} />;
};

RichTabs.Tab = function Tab({ className, ...p }: RadixTabs.TabsTriggerProps) {
  return <RadixTabs.Trigger {...p} className={cx(styles.tab, className)} />;
};

RichTabs.Panels = function Panels({
  className,
  ...p
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...p} className={cx(styles.panels, className)} />;
};

RichTabs.Panel = function Panel({
  className,
  ...p
}: RadixTabs.TabsContentProps) {
  return <RadixTabs.Content {...p} className={cx(styles.panel, className)} />;
};

export function RichTabs({
  children,
  className,
  ...rest
}: RadixTabs.TabsProps) {
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
    <RadixTabs.Root
      className={cx(styles.root, className)}
      {...rest}
      value={tabValue}
      onValueChange={handleValueChanged}
    >
      {children}
    </RadixTabs.Root>
  );
}
