module.exports = {
    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'all',
    semi: false,
    tabWidth: 2,
    printWidth: 80,
    arrowParens: 'always',
    importOrder: [
      '^@(pragma)/(.*)$',
      '^@lib/(.*)$',
      '^@components/(.*)$',
      '^@(server|trpc)/(.*)$',
      '^~/(.*)$',
      '^[./]',
    ],
    importOrderSeparation: true,
  }
  