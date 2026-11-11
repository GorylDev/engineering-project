import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import typescript from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...typescript.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  prettier,
  globalIgnores([
    ".pnpm-store/**",
    ".next/**",
    "out/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "src/generated/**",
    "next-env.d.ts",
  ]),
]);
