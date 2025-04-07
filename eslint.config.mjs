import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*', 'coverage/**/*', '.hygen/**/*', '.swc/**/*', 'scripts/**/*', 'test/**/*', 'tsconfig-paths-bootstrap.cjs'],
  },
  js.configs.recommended,
  ...compat.config({
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  }),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[callee.object.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true]))',
          message:
            'Add "{ infer: true }" to configService.get() for type safety',
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: js.parser,
      parserOptions: {},
    },
  },
];
