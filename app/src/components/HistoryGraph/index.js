import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const transformTransactions = (address, balance, transactions) => {
  const transformedTransactions = transactions
    .map(({ timestamp, ...transaction }) => ({
      ...transaction,
      time: new Date(timestamp),
    }))
    .sort(({ time: timeA }, { time: timeB }) => timeB - timeA)
    .reduce(
      (acc, curr) => {
        const { amount, fromAddress, toAddress } = acc[0];

        let { balance: prevBalance } = acc[0];

        prevBalance += fromAddress === address ? amount : 0;
        prevBalance -= toAddress === address ? amount : 0;

        // Filter transactions where an address sends coins to the same address
        if (curr.fromAddress && curr.fromAddress === curr.toAddress) {
          return acc;
        }

        return [{ ...curr, balance: prevBalance }, ...acc];
      },
      [{ balance }]
    );

  // Remove { balance: balance } from transformedTransactions
  transformedTransactions.pop();

  return transformedTransactions;
};

const HistoryGraph = ({ address, balance, transactions }) => {
  const transformedTransactions = transformTransactions(
    address,
    balance,
    transactions
  );

  const options = {
    title: {
      text: 'Jobcoin History Graph',
    },
    xAxis: {
      categories: transformedTransactions.map(({ time }) =>
        time.toLocaleString()
      ),
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: 'Balance',
      },
    },
    series: [
      {
        name: 'Balance',
        data: transformedTransactions.map(
          ({ balance: currBalance, fromAddress, toAddress, amount }) => ({
            name:
              fromAddress === address
                ? `-${amount} To ${toAddress}`
                : `+${amount} From ${fromAddress}`,
            y: currBalance,
          })
        ),
        zoneAxis: 'x',
        zones: transformedTransactions.map(({ fromAddress }, index) => ({
          color: fromAddress === address ? 'red' : 'green',
          value: index + 0.01,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

HistoryGraph.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.number,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number,
      fromAddress: PropTypes.string,
      toAddress: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ),
};

HistoryGraph.defaultProps = {
  address: '',
  balance: 0,
  transactions: [],
};

export default HistoryGraph;
