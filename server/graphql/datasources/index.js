const JobcoinAPI = require('./jobcoin');

const dataSources = () => ({
    jobcoinAPI: new JobcoinAPI(),
});

module.exports = dataSources;
