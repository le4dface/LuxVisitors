module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jasmine": true,
        "phantomjs": true,
        "jquery": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    // 0 = 'off'
    // 1 = 'warning'
    // 2 = 'error'
    "rules": {
        "no-cond-assign": 1,
        "indent": ["warn", 4],
        "quotes": ["warn", "single"],
        "semi": ["warn", "always"],
        "eqeqeq": 1,
        "default-case": 1,
        "no-empty-function": 1,
        "camelcase": 1,
        "no-unused-vars": 1,
        "no-extra-semi": 1,
        "no-console":0,
        'no-use-before-define': 0
    }
};
