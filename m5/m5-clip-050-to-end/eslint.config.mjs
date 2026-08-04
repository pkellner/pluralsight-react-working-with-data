import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Next.js 16 removed the `next lint` command, so linting now runs ESLint
// directly (`npm run lint`). eslint-config-next ships a flat config array,
// which is what ESLint 9 expects.
const config = [
  { ignores: [".next/**", "node_modules/**"] },
  ...nextCoreWebVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      // The course deliberately teaches the useEffect + setState loading-state
      // pattern (modules 3-5) before contrasting it with Suspense. This rule
      // ships with the React 19 hooks plugin and post-dates the recordings, so
      // it flags the curriculum itself. Off so `npm run lint` stays useful.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
];

export default config;
