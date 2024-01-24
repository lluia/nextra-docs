import manifest from "@/data/manifest.json";
import { useState } from "react";

const providerList = Object.entries(manifest.providers).map(([id, name]) => {
  return { id, name };
});

export function useSelectProvider() {
  const [term, setTerm] = useState("");

  function handleSearchItem(term: string) {
    setTerm(term);
  }

  function handleSelectOption(option: string) {
    setTerm(option);
  }

  return {
    items: providerList.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    ),
    term,
    handleSearchItem,
    handleSelectOption,
  };
}
