// @ts-check
const fs = require("node:fs");
const path = require("node:path");

// TODO: Fix when in the monorepo
const core = "../next-auth/packages/core";
// list providers entries from @auth/core/providers/*.ts
const coreSrc = `${core}/src`;
const providers = fs
  .readdirSync(path.join(coreSrc, "/providers"))
  .filter((file) => file.endsWith(".ts") && !file.startsWith("oauth"))
  .map((p) => `${coreSrc}/providers/${p}`);

/** @type {import('typedoc-plugin-markdown').PluginOptions} */
module.exports = {
  cleanOutputDir: true,
  disableSources: true,
  entryPoints: ["index.ts", "adapters.ts", "errors.ts", "jwt.ts", "types.ts"]
    .map((e) => `${coreSrc}/${e}`)
    .concat(providers),
  entryModule: `${core}/src/index.ts`,
  entryPointStrategy: "expand",
  excludeExternals: true,
  excludeGroups: true,
  excludeInternal: true,
  excludeNotDocumented: true,
  excludePrivate: true,
  excludeProtected: true,
  expandObjects: true,
  githubPages: false,
  gitRevision: "main",
  hidePageHeader: true,
  hideBreadcrumbs: true,
  hideGenerator: true,
  hideParameterTypesInTitle: false,
  kindSortOrder: [
    "Function",
    "TypeAlias",
    "Interface",
    "Reference",
    "Project",
    "Module",
    "Namespace",
    "Class",
    "Constructor",
    "Property",
    "Variable",
    "Accessor",
    "Method",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature",
  ],
  plugin: [
    "typedoc-plugin-markdown",
    require.resolve("./typedoc-mdn-links.cjs"),
  ],
  readme: "none",
  sort: ["kind", "static-first", "required-first", "alphabetical"],
  tsconfig: `${core}/tsconfig.json`,
  useCodeBlocks: true,
  out: "pages/reference/core",
  outputFileStrategy: "modules",
};
