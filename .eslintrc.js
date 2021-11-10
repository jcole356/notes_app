module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin: import/typescript"
  ],
  globals: {
    "Headers": "readonly",
    "Request": "readonly",
    "document": "readonly",
    "fetch": "readonly",
    "sessionStorage": "readonly",
    "HTMLInputElement": "readonly",
    "RequestCache": "readonly"
  },
  rules:  {
    'react/jsx-filename-extension': [2, { 'extensions': ['.jsx','.tsx'] }],
  },
};
