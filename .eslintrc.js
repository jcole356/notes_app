module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb", "plugin:prettier/recommended"],
    "globals": {
        "Headers": "readonly",
        "Request": "readonly",
        "document": "readonly",
        "fetch": "readonly",
        "sessionStorage": "readonly"
    }
};