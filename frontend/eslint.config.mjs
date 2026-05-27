import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
  ...nextVitals,

  prettierConfig,

  {
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      import: importPlugin
    },

    rules: {
      // unused imports
      'no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],

      quotes: ['error', 'single'],

      semi: ['error', 'always'],

      'comma-dangle': ['error', 'never'],

      'object-curly-spacing': ['error', 'always'],

      'array-bracket-spacing': ['error', 'never'],

      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],

      'space-infix-ops': 'error',

      'eol-last': ['error', 'always'],

      'no-trailing-spaces': 'error',

      'prefer-const': 'error',

      eqeqeq: ['error', 'always'],

      curly: ['error', 'all'],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1
        }
      ],

      // imports
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc'
          }
        }
      ],

      // prettier
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          semi: true,
          trailingComma: 'none',
          printWidth: 100,
          bracketSpacing: true,
          arrowParens: 'always'
        }
      ]
    }
  }
];

export default eslintConfig;
