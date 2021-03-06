module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'quotes': ['error', 'single'],
    'func-names': 'off',
    "import/prefer-default-export": "off",
    "operator-linebreak": [2, "after"],
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
