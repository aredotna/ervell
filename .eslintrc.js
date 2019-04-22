module.exports = {
  "extends": "airbnb",
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jest": true
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
    "jsx-a11y/tabindex-no-positive": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": 0,
    "react/no-danger": 0,
    "react/no-did-mount-set-state": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "camelcase": 0,
    "no-underscore-dangle": 0,
    "no-debugger": 0,
    "import/prefer-default-export": 0,
  }
};
