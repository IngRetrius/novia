import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "jsx-a11y/alt-text": "off", // Deshabilita la regla de "alt" en imágenes
      "react/no-unescaped-entities": "off", // Permite comillas sin escapar en JSX
      "@next/next/no-img-element": "off", // Permite usar <img> en lugar de <Image />
    },
  },
];

export default eslintConfig;
