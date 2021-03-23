const { expect } = require('chai');

const plays = require('./plays.json');
const invoice = require('./invoices')[0];
const { statement, htmlStatement } = require('./statement');

describe('statement', () => {
  it('prints statement for first invoice', () => {
      const expected = 'Statement for BigCo\n' +
        '  Hamlet: $650.00 (55 seats)\n' +
        '  As You Like It: $580.00 (35 seats)\n' +
        '  Othello: $500.00 (40 seats)\n' +
        'Amount owed is $1,730.00\n' +
        'You earned 47 credits\n';
      const actual = statement(invoice, plays);

      expect(actual).to.equal(expected)
    });
});

xdescribe('htmlStatement', () => {
  it('prints statement for first invoice', () => {
      const expected = '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '  <tr><th>play</th><th>seats</th><th>cost</th></tr>\n' +
        '  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        '  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        '  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n';

      const actual = htmlStatement(invoice, plays);

      expect(actual).to.equal(expected)
    });
});
