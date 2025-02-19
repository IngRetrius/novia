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
      "jsx-a11y/alt-text": "warn", // Cambiado a "warn" en lugar de deshabilitar completamente (buena práctica de accesibilidad)
      "react/no-unescaped-entities": "off", // Permite comillas sin escapar en JSX
      "@next/next/no-img-element": "error", // Se mantiene en "error" para fomentar el uso de <Image /> de Next.js
    },
  },
];

export default eslintConfig;
