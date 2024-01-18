module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    JSX: true,
  },

  ignorePatterns: ["node_modules", "public", "**/*/_meta.js"],

  overrides: [
    {
      files: ["*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
      ],

      settings: {
        react: {
          version: "detect",
        },
      },
      // When adding a new rule or disabling a rule, please add a comment for why!
      rules: {
        // typescript does this already, and this linter can't detect (V)FC<Props>
        "react/prop-types": "off",
        // Unused things are fine in dev but still worth warning about for PRs etc.
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        // Always use the structured logger for Datadog logs
        "no-console": "error",
        // React does not have to be imported in the latest version of React
        "react/react-in-jsx-scope": "off",
        // to ensure an actual error is suppressed
        "@typescript-eslint/prefer-ts-expect-error": "error",
        // enforce consistent styling for component declarations
        "react/function-component-definition": [
          2,
          { namedComponents: "function-declaration" },
        ],
        // keep callback styling consistent
        "prefer-arrow-callback": 2,
        // async things should be awaited 99.9% of the time
        "@typescript-eslint/no-floating-promises": "error",
      },
    },
  ],
};
