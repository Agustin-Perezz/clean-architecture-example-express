import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.ts'] },
  { languageOptions: { ecmaVersion: 2022, sourceType: 'module' } },
  tseslint.configs.recommended,
  { plugins: { prettier } },
  { rules: { 'prettier/prettier': 'error' } },
);