module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
  testPathIgnorePatterns: ['/scripts/', '/node_modules/', '/integration/'],
  verbose: true,
  setupFilesAfterEnv: ['./setup-tests.js'],

  // A transformer is a module that provides a synchronous function for transforming source files. Essential for TypeScript.
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Since all files inside node_modules are not transformed by default, Jest will not understand the code in these modules, resulting in syntax errors. To overcome this, you may use transformIgnorePatterns to whitelist such modules.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?@sentry|react-native|react-navigation|@react-navigation/.*))',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/features/**', 'src/utils/**'],
  coveragePathIgnorePatterns: [
    'src/features/.*/((reducer.ts)|(index.ts))',
    'src/utils/createWallet.ts',
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    // global: {
    //   branches: 40,
    //   functions: 30,
    //   lines: 35,
    //   statements: 35,
    // },
    'src/features/account_import/**/{!(reducer),}.*': {
      branches: 70,
      functions: 55,
      statements: 90,
      lines: 90,
    },
    'src/features/api/**/{!(reducer),}.*': {
      branches: 90,
      functions: 90,
      statements: 90,
      line: 90,
    },
    'src/features/transaction_confirmation_dialog/**/{!(reducer),}.*': {
      branches: 90,
      functions: 90,
      statements: 0,
      line: 0,
    },
    'src/features/transaction_send/substrate/**/{!(reducer),}.*': {
      branches: 5,
      functions: 25,
      statements: 50,
      line: 50,
    },
    'src/features/landing/**/{!(reducer),}.*': {
      branches: 90,
      functions: 90,
      statements: 90,
      line: 90,
    },
    'src/features/generate_secret_phrase/**/{!(reducer),}.*': {
      branches: 50,
      functions: 50,
      statements: 80,
      line: 80,
    },
    'src/features/home/**/{!(reducer),}.*': {
      branches: 90,
      functions: 90,
      statements: 90,
      line: 90,
    },
  },
};
