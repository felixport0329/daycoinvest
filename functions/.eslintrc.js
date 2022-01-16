module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    // quotes: ["error", "double"],
    // quotes: ["off", "double"],
    "quotes": ["warn", "double"],
    "camelcase": "off",
    "indent": "off",
    "spaced-comment": "off",
    "object-curly-spacing": "off",
    "no-trailing-spaces": "off",
    "semi": "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "require-jsdoc": "off",
    "brace-style": "off",
    "prefer-const": "off",
  },
};
