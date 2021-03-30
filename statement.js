module.exports = {
  statement,
};

function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  let totalAmount = 0;
  for (let perf of invoice.performances) {
    // print line for this order
    result += `  ${_playFor(perf).name}: ${format(_amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += _amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${_totalVolumeCredits()} credits\n`;
  return result;

  function _volumeCreditFor(performance) {
    let result = Math.max(performance.audience - 30, 0);
    if ('comedy' === _playFor(performance).type) {
      result += Math.floor(performance.audience / 5);
    }

    return result;
  }

  function _totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += _volumeCreditFor(perf);
    }

    return result;
  }

  function _playFor(performance) {
    const play = plays[performance.playID];
    return play;
  }

  function _amountFor(performance) {
    let result = 0;

    switch (_playFor(performance).type) {
      case 'tragedy':
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${_playFor(performance).type}`);
    }

    return result;
  }
}
