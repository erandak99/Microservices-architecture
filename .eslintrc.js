module.exports = {
  extends: 'airbnb-base',
  ignorePatterns: ['**/.*', 'tests', 'build', 'coverage', 'dist', 'node_modules', 'scripts'],
  rules: {
    'eol-last': 0,
    'class-methods-use-this': 0,
    semi: ['error', 'never'],
    'function-paren-newline': ['error', 'consistent'],
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'never']
  }
}