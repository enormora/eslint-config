import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { disable } from '../../rule-severity.ts';

export const reactConfig = {
    plugins: {
        react: reactPlugin,
        'react-hooks': hooksPlugin,
        sonarjs: sonarjsPlugin
    },
    rules: {
        'sonarjs/no-uniq-key': 'error',
        'sonarjs/no-useless-react-setstate': 'error',

        'react/boolean-prop-naming': disable<'Boolean prop names need not follow a fixed prefix scheme'>(),
        'react/button-has-type': 'error',
        'react/default-props-match-prop-types': disable<'TypeScript is preferred for prop validation'>(),
        'react/destructuring-assignment': disable<'Props and state may be accessed directly'>(),
        'react/display-name': 'error',
        'react/forbid-component-props': disable<'Component prop restrictions depend on the component API'>(),
        'react/forbid-dom-props': disable<'DOM prop restrictions depend on the consuming application'>(),
        'react/forbid-elements': disable<'Element deny lists depend on the consuming application'>(),
        'react/forbid-foreign-prop-types': disable<'Runtime prop type reuse is allowed'>(),
        'react/forbid-prop-types': disable<'Runtime prop type restrictions depend on the consuming application'>(),
        'react/function-component-definition': disable<'Function declarations and expressions are both allowed'>(),
        'react/jsx-boolean-value': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-child-element-spacing': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-closing-bracket-location': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-closing-tag-location': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-curly-spacing': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-curly-newline': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-equals-spacing': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-filename-extension': disable<'File extensions are configured by the JSX and TSX presets'>(),
        'react/jsx-first-prop-new-line': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-handler-names': disable<'Event handler names need not follow a fixed pattern'>(),
        'react/jsx-indent': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-indent-props': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-key': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-max-depth': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-max-props-per-line': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-newline': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-no-bind': disable<'Inline callbacks are allowed when stable identity is unnecessary'>(),
        'react/jsx-no-comment-textnodes': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-no-duplicate-props': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-no-literals': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-no-script-url': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-no-target-blank': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-no-useless-fragment': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-one-expression-per-line': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-no-undef': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-curly-brace-presence': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-pascal-case': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-fragments': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-props-no-multi-spaces': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-props-no-spreading': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-tag-spacing': disable<'JSX layout is handled by the active formatter'>(),
        'react/jsx-uses-react': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-uses-vars': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/jsx-wrap-multilines': disable<'JSX layout is handled by the active formatter'>(),
        'react/no-access-state-in-setstate': 'error',
        'react/no-adjacent-inline-elements': disable<'Inline element spacing is handled by the active formatter'>(),
        'react/no-array-index-key': disable<
            'Index key failures should be reproduced by behavior tests rather than a blanket lint ban'
        >(),
        'react/no-children-prop': disable<'Explicit children props are allowed'>(),
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-multi-comp': disable<'Related components may share a module'>(),
        'react/no-set-state': disable<'State updates are allowed'>(),
        'react/no-string-refs': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'error',
        'react/no-this-in-sfc': 'error',
        'react/no-typos': disable<'TypeScript is preferred for prop validation'>(),
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',
        'react/no-unsafe': 'error',
        'react/no-unused-prop-types': disable<
            'TypeScript prop declarations are preferred; unused prop checks are enabled in the react-tsx preset'
        >(),
        'react/no-unused-state': 'error',
        'react/no-will-update-set-state': 'error',
        'react/prefer-es6-class': disable<'Function components are preferred by react/prefer-stateless-function'>(),
        'react/prefer-read-only-props': disable<'Readonly types are handled by the typescript preset'>(),
        'react/prefer-stateless-function': 'error',
        'react/prop-types': disable<'TypeScript is preferred for prop validation'>(),
        'react/react-in-jsx-scope': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/require-default-props': disable<
            'TypeScript prop contracts and destructuring defaults are preferred over defaultProps'
        >(),
        'react/require-optimization': disable<'Components need not implement manual render optimization'>(),
        'react/require-render-return': 'error',
        'react/self-closing-comp': disable<'Self-closing syntax is handled by the active formatter'>(),
        'react/sort-comp': disable<'Component members may follow logical order'>(),
        'react/jsx-sort-props': disable<'JSX properties may follow domain order'>(),
        'react/sort-prop-types': disable<'Prop type properties may follow domain order'>(),
        'react/state-in-constructor': disable<'State initialization location is not prescribed'>(),
        'react/static-property-placement': disable<'Static property placement is not prescribed'>(),
        'react/style-prop-object': disable<'Styling approaches and custom style prop contracts are not prescribed'>(),
        'react/void-dom-elements-no-children': 'error',
        'react/jsx-no-constructed-context-values': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/no-unstable-nested-components': 'error',
        'react/prefer-exact-props': disable<'Exact runtime prop types are not required'>(),
        'react/no-namespace': 'error',
        'react/no-invalid-html-attribute': disable<
            'Attribute validity may depend on custom components and DOM extensions'
        >(),
        'react/no-arrow-function-lifecycle': disable<'Lifecycle method syntax is not prescribed'>(),
        'react/no-unused-class-component-methods': disable<'Methods may be consumed through component references'>(),
        'react/hook-use-state': disable<'State destructuring names need not follow a fixed pattern'>(),
        'react/iframe-missing-sandbox': 'error',
        'react/jsx-no-leaked-render': disable<'Enabled in the react-jsx and react-tsx presets'>(),
        'react/no-object-type-as-default-prop': 'error',
        'react/sort-default-props': disable<'Default props may follow domain order'>(),
        'react/checked-requires-onchange-or-readonly': disable<
            'Input state may be managed by component-specific event contracts'
        >(),
        'react/jsx-props-no-spread-multi': 'error',
        'react/forward-ref-uses-ref': disable<'Uses removed context.getSourceCode API and crashes on ESLint 10'>(),

        'react-hooks/capitalized-calls': disable<
            'Overlaps new-cap; additional React-specific capitalized call restrictions are not enforced'
        >(),
        'react-hooks/config': disable<'React Compiler is outside the supported and recommended toolchain'>(),
        'react-hooks/gating': disable<'React Compiler is outside the supported and recommended toolchain'>(),
        'react-hooks/globals': 'error',
        'react-hooks/hooks': disable<'Hook call legality is handled by react-hooks/rules-of-hooks'>(),
        'react-hooks/refs': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/error-boundaries': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/exhaustive-effect-dependencies': disable<
            'Dependency validation is handled by react-hooks/exhaustive-deps'
        >(),
        'react-hooks/fbt': disable<'FBT integration belongs to projects using that library'>(),
        'react-hooks/immutability': 'error',
        'react-hooks/incompatible-library': disable<
            'Memoization compatibility restrictions require a demonstrated need in the consuming project'
        >(),
        'react-hooks/invariant': disable<'React Compiler is outside the supported and recommended toolchain'>(),
        'react-hooks/memo-dependencies': disable<'Dependency validation is handled by react-hooks/exhaustive-deps'>(),
        'react-hooks/no-deriving-state-in-effects': disable<'Effect-driven state derivation is allowed'>(),
        'react-hooks/memoized-effect-dependencies': disable<
            'Memoization should follow demonstrated need rather than be required for effect dependencies'
        >(),
        'react-hooks/preserve-manual-memoization': disable<
            'React Compiler is outside the supported and recommended toolchain'
        >(),
        'react-hooks/purity': 'error',
        'react-hooks/rule-suppression': disable<'Explained rule suppressions are allowed'>(),
        'react-hooks/set-state-in-effect': disable<
            'Effects may intentionally update local component state synchronously'
        >(),
        'react-hooks/set-state-in-render': 'error',
        'react-hooks/static-components': 'error',
        'react-hooks/syntax': disable<'React Compiler is outside the supported and recommended toolchain'>(),
        'react-hooks/todo': disable<'React Compiler is outside the supported and recommended toolchain'>(),
        'react-hooks/use-memo': 'error',
        'react-hooks/unsupported-syntax': disable<
            'React Compiler is outside the supported and recommended toolchain'
        >(),
        'react-hooks/void-use-memo': 'error'
    }
};
