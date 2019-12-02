const { RESTDataSource } = require('apollo-datasource-rest');

class JobcoinAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://jobcoin.gemini.com/mayflower-outmatch/api/';
  }

  transactionReducer = (transactions = []) =>
    transactions.map(({ timestamp, fromAddress, toAddress, amount }) => ({
      timestamp,
      fromAddress,
      toAddress,
      amount
    }));

  addressReducer = ({ balance, transactions } = {}, address) => ({
    address,
    balance,
    transactions: this.transactionReducer(transactions)
  });

  transactionResponseReducer = ({ status, error } = {}) => ({
    success: status === 'OK',
    status,
    error
  });

  async getAddress({ address }) {
    let response;
    try {
      response = await this.get(`addresses/${address}`);
    } catch (e) {
      response = require(`./mock/address/${address}.json`);
    }
    return this.addressReducer(response, address);
  }

  async getAllTransactions() {
    let response;
    try {
      response = await this.get('transactions');
    } catch (e) {
      response = require('./mock/transactions.json');
    }
    return this.transactionReducer(response);
  }

  async createTransaction({ fromAddress, toAddress, amount }) {
    const response = await this.post('transactions', {
      fromAddress,
      toAddress,
      amount
    }).catch((error = {}) => {
      const {
        extensions: { response: { status, body = {} } = {} } = {}
      } = error;
      if (status === 422) {
        return body;
      } else if (
        status === 400 &&
        body.error &&
        Array.isArray(body.error.amount)
      ) {
        return { error: body.error.amount[0] };
      }

      console.error(error);

      throw error;
    });
    return this.transactionResponseReducer(response);
  }
}

module.exports = JobcoinAPI;
