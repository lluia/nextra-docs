import * as Ariakit from "@ariakit/react";
import { useSelectProvider } from "./useSelectProvider";
import { ChangeEvent } from "react";
import { OAuthInstructions } from "../OAuthInstructions";
import manifest from "@/data/manifest.json";

export function SelectProvider() {
  const { items, term, selected, handleSearchItem, handleSelectOption } =
    useSelectProvider();

  return (
    <>
      <Ariakit.ComboboxProvider value={term}>
        <Ariakit.ComboboxLabel className="block font-semibold text-xl mb-2">
          Select an OAuth Provider
        </Ariakit.ComboboxLabel>
        <Ariakit.Combobox
          placeholder="Type and select an OAuth Provider"
          className="px-4 py-2 bg-slate-100 rounded-sm shadow-md border-slate-400 text-slate-800 font-medium w-full md:w-96"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearchItem(e.target.value)
          }
        />
        {items.length && term ? (
          <Ariakit.ComboboxPopover
            gutter={4}
            sameWidth
            className="bg-slate-100 rounded-md p-2 max-h-72 overflow-y-scroll mt-1 z-50"
          >
            {items.map((item) => (
              <Ariakit.ComboboxItem
                className="py-2 px-2 flex flex-row items-center gap-4 cursor-pointer aria-selected:bg-amber-200"
                value={item.name}
                key={item.name}
                onClick={() => handleSelectOption(item)}
              >
                <img
                  src={`/img/providers/${item.id}.svg`}
                  className="h-6 w-6 rounded-sm"
                />{" "}
                {item.name}
              </Ariakit.ComboboxItem>
            ))}
          </Ariakit.ComboboxPopover>
        ) : !term ? (
          <p className="mt-6 py-2 px-4 bg-amber-100 rounded-md">
            Type and select a provider to see its setup instructions.
          </p>
        ) : (
          <p className="mt-6 py-2 px-4 bg-amber-100 rounded-md">
            Can't find the OAuth provider you're looking for? Then, you'll need
            to{" "}
            <a href="/guides/custom-oauth" className="font-medium text-sky-600">
              build your own provider
            </a>
            .
          </p>
        )}
      </Ariakit.ComboboxProvider>
      {selected ? (
        <OAuthInstructions
          providerId={selected}
          disabled={term !== manifest.providers[selected]}
        />
      ) : null}
    </>
  );
}
