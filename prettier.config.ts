const plugins = ['prettier-plugin-organize-imports'];

const options = {
  bracketSpacing: false,
  printWidth: 120,
  quoteProps: 'preserve',
  singleAttributePerLine: true,
  singleQuote: true,
};

const overrides = [
  {
    files: '*.html',
    options: {
      parser: 'angular',
    },
  },
];

export default {plugins, ...options, overrides};
