const { RESTDataSource } = require('apollo-datasource-rest');

class JobcoinAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://jobcoin.gemini.com/mayflower-outmatch/api/';
  }

  transactionReducer = (transactions = []) => transactions.map(({
    timestamp,
    fromAddress,
    toAddress,
    amount,
  }) => ({
    timestamp,
    fromAddress,
    toAddress,
    amount,
  }));

  addressReducer = (
    { balance, transactions } = {},
    address,
  ) => ({
    address,
    balance,
    transactions: this.transactionReducer(transactions),
  })
  
  async getAddress({ address }) {
    const response = await this.get(`addresses/${address}`);
    return this.addressReducer(response, address);
  }

  async getAllTransactions() {
    const response = await this.get('transactions');
    return this.transactionReducer(response);
  }
}

module.exports = JobcoinAPI;