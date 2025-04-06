import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[callee.object.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true]))',
          message:
            'Add "{ infer: true }" to configService.get() for correct typechecking.',
        },
        {
          selector: 'CallExpression[callee.name=it][arguments.0.value!=/^should/]',
          message: '"it" should start with "should"',
        },
      ],
    },
  },
];
