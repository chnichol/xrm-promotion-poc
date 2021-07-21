module.exports = {
    'env': {
      'browser': true
    },
    'parserOptions': {
      'ecmaVersion': 9,
      'sourceType': 'module',
    },
    'rules': {
      'no-restricted-properties': [3, {
        'object': 'Xrm',
        'property': 'Page'
      }],
      'eqeqeq': ['error', 'always']
    },
  };