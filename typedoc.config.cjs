// @ts-check
const fs = require("node:fs")
const path = require("node:path")

// list providers entries from @auth/core/providers/*.ts
const coreSrc = "/opt/nextauthjs/next-auth/packages/core/src"
const providers = fs
  .readdirSync(path.join(coreSrc, "/providers"))
  .filter((file) => file.endsWith(".ts") && !file.startsWith("oauth"))
  .map((p) => `${coreSrc}/providers/${p}`)

/**
 * @type {import('typedoc').TypeDocOptions & import('typedoc-plugin-markdown').MarkdownTheme}
 */
module.exports = {
  entryPoints: ["index.ts", "adapters.ts", "errors.ts", "jwt.ts", "types.ts"]
    .map((e) => `${coreSrc}/${e}`)
    .concat(providers),
  entryPointStrategy: "expand",
  watch: process.env.TYPEDOC_WATCH,
  out: "pages/reference/core",
  tsconfig: "/opt/nextauthjs/next-auth/packages/core/tsconfig.json",
  excludeNotDocumented: true,
  plugin: ["typedoc-plugin-markdown", require.resolve("./typedoc-mdn-links.cjs")],
  // symbolsWithOwnFile: "none",
  // hideHierarchy: true,
  hideInPageTOC: true,
  disableSources: true,
  hideBreadcrumbs: true,
  excludeExternals: true,
  excludeInternal: true,
  excludePrivate: true,
  excludeProtected: true,
  cleanOutputDir: true,
  gitRevision: "main",
  githubPages: false,
  hideGenerator: true,
  readme: "none",
  sort: ["kind", "static-first", "required-first", "alphabetical"],
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
    // "ObjectLiteral",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature",
  ],
}
