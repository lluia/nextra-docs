import * as Ariakit from "@ariakit/react";
import { useSelectProvider } from "./useSelectProvider";
import { ChangeEvent } from "react";
import { OAuthInstructions } from "../OAuthInstructions";
import manifest from "@/data/manifest.json";
import { Link } from "../Link";

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
          className="px-4 py-2 bg-slate-100 rounded-sm shadow-md border-slate-400 text-slate-800 font-medium w-full md:w-96 dark:bg-slate-800 dark:text-slate-300"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearchItem(e.target.value)
          }
        />
        {items.length && term ? (
          <Ariakit.ComboboxPopover
            gutter={4}
            sameWidth
            className="bg-slate-100 rounded-md p-2 max-h-72 overflow-y-scroll mt-1 z-50 dark:bg-slate-900"
          >
            {items.map((item) => (
              <Ariakit.ComboboxItem
                className="py-2 px-2 flex flex-row items-center gap-4 cursor-pointer aria-selected:bg-amber-200 dark:aria-selected:text-slate-900"
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
          <>
            <p className=" mt-8 rounded-md">
              <strong>
                ↑ Type and select a provider to see its setup instructions.
              </strong>{" "}
              Otherwise, here are some suggested OAuth providers, click on any
              of them to see the provider's setup instructions:
            </p>
            <div className="mt-8 flex flex-row gap-6 pb-8">
              <div
                role="button"
                onClick={() =>
                  handleSelectOption({ id: "google", name: "Google" })
                }
                className="p-4 border border-solid dark:border-neutral-800 border-slate-200 rounded-lg flex flex-col items-center justify-between w-32 shadow-lg h-32 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:hover:bg-slate-600"
              >
                <img src={`/img/providers/google.svg`} className="w-11 mt-2" />
                <div className="text-sm text-center">Google</div>
              </div>
              <div
                role="button"
                onClick={() =>
                  handleSelectOption({ id: "twitter", name: "Twitter" })
                }
                className="p-4 border border-solid dark:border-neutral-800 border-slate-200 rounded-lg flex flex-col items-center justify-between w-32 shadow-lg h-32 hover:bg-slate-50 transition-color dark:border-slate-600 dark:hover:bg-slate-600"
              >
                <img src={`/img/providers/twitter.svg`} className="w-11 mt-2" />
                <div className="text-sm text-center">Twitter</div>
              </div>
              <div
                role="button"
                onClick={() =>
                  handleSelectOption({ id: "facebook", name: "Facebook" })
                }
                className="p-4 border border-solid dark:border-neutral-800 border-slate-200 rounded-lg flex flex-col items-center justify-between w-32 shadow-lg h-32 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:hover:bg-slate-600"
              >
                <img
                  src={`/img/providers/facebook.svg`}
                  className="w-11 mt-2"
                />
                <div className="text-sm text-center">Facebook</div>
              </div>
              <div
                role="button"
                onClick={() =>
                  handleSelectOption({ id: "auth0", name: "Auth0" })
                }
                className="p-4 border border-solid dark:border-neutral-800 border-slate-200 rounded-lg flex flex-col items-center justify-between w-32 shadow-lg h-32 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:hover:bg-slate-600"
              >
                <img src={`/img/providers/auth0.svg`} className="w-11 mt-2" />
                <div className="text-sm text-center">Auth0</div>
              </div>
              <div
                role="button"
                className="p-4 border border-solid dark:border-neutral-800 border-slate-200 rounded-lg flex flex-col items-center justify-between w-32 shadow-lg h-32 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:hover:bg-slate-600"
                onClick={() =>
                  handleSelectOption({ id: "auth0", name: "Auth0" })
                }
              >
                <img src={`/img/providers/github.svg`} className="w-11 mt-2" />
                <div className="text-sm text-center">Github</div>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-6 py-2 px-4 bg-amber-100 rounded-md dark:bg-amber-400 dark:text-slate-900">
            Can't find the OAuth provider you're looking for? Then, you'll need
            to <Link href="/guides/custom-oauth">build your own provider</Link>.
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
