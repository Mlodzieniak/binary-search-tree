# webpack-project-starter
For eslint setup run:
npm init @eslint/config

eslintrc.json setup
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "overrides": [],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error"
        ]
    }
}