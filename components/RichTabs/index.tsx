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
  const router = useRouter();
  const {
    query: { tab },
  } = router;
  const tabValue = Array.isArray(tab)
    ? tab?.[0]
    : typeof tab === "string"
    ? tab
    : rest.defaultValue;

  console.log("tab", { tab, tabValue });
  return (
    <RadixTabs.Root
      className={cx(styles.root, className)}
      {...rest}
      defaultValue={tabValue}
    >
      {children}
    </RadixTabs.Root>
  );
}
