import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  // Global ignores - must come first
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/.git/**",
      "**/coverage/**",
    ],
  },
  // Next.js recommended configs
  ...nextVitals,
  ...nextTs,
  // Prettier integration
  prettier,
  // Custom rules
  {
    rules: {
      "prettier/prettier": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

export default eslintConfig;
