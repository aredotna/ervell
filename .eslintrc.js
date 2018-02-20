module.exports = {
  "extends": "airbnb",
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "camelcase": 0,
  }
};
