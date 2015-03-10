exports.config = {
  // This is to use with a running Selenium-Server
  // Unconment this to use a stand alone Selenium-Server instead
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // If selenium server is updated you gonna need to change this file name
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  seleniumPort: 4444,

  specs: ['specs/*-spec.js'],
  baseUrl: 'http://localhost:9000',
  capabilities: {
    'browserName': 'phantomjs'
  },
  framework: 'jasmine',
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose : true,
    includeStackTrace : true
  }
};
