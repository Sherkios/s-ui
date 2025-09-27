// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginImport from 'eslint-plugin-import'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/.storybook/**',
  ]),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  pluginImport.flatConfigs.recommended,

  {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@src', './src'],
            ['@assets', './src/assets'],
            ['@components', './src/components'],
            ['@utils', './src/utils'],
          ],
          extensions: ['.ts', '.js', '.vue'],
        },
      },
    },

    rules: {
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'CONTENT',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_STATIC',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_DYNAMIC',
          ],
          alphabetical: true,
        },
      ],

      // атрибуты в несколько строк
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3, // если помещается в одну строку ≤ 3 атрибутов — оставить
          multiline: {
            // иначе переносим
            max: 1, // по одному атрибуту на строку
            allowFirstLine: false,
          },
        },
      ],

      // ограничение длины строки
      'max-len': [
        'error',
        {
          code: 80, // максимум символов в строке
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],

      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'any',
            normal: 'any',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],

      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  skipFormatting,
)
