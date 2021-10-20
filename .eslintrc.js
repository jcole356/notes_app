module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  globals: {
    "Headers": "readonly",
    "Request": "readonly",
    "document": "readonly",
    "fetch": "readonly",
    "sessionStorage": "readonly"
  },
  rules:  {
    'react/jsx-filename-extension': [2, { 'extensions': ['.jsx','.tsx'] }],
  },
};
