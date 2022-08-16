import fetch from 'node-fetch';
import alfy from 'alfy';
import math from 'string-math';
import dotenv from 'dotenv';

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

dotenv.config({
  path: `${process.env.HOME}/.dotfiles/dotenv/.env`,
});

// [INPUT]
const input = alfy.input.trim();
const API_KEY = process.env.CURRENCY_API_KEY;
const inputToMath = isNumeric(input.at(-1))
  ? input
  : `${input}0`;
const AMOUNT = math(inputToMath);
const FROM = 'USD';

// [PROCESS]
const apiOutput = await fetch(`https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}&from=${FROM}&amount=${AMOUNT}`)
  .then((res) => res.json());

const rates = {
  ...apiOutput.response.rates,
  USD: AMOUNT,
}

// [OUTPUT]
const valueOutput = (rate) => parseFloat(rate * AMOUNT).toFixed(2);
const currencies = [
  {
    flag: '🇧🇷',
    name: 'BRL',
    prefix: 'R$',
    value: valueOutput(rates.BRL),
  },
  {
    flag: '🇺🇸',
    name: 'USD',
    prefix: '$',
    value: rates.USD,
  },
  {
    flag: '🇪🇺',
    name: 'EUR',
    prefix: '€',
    value: valueOutput(rates.EUR),
  },
  {
    flag: '🇦🇷',
    name: 'ARS',
    prefix: '$',
    value: valueOutput(rates.ARS),
  },
  {
    flag: '🇯🇵',
    name: 'JPY',
    prefix: '¥',
    value: valueOutput(rates.JPY),
  },
];
const output = currencies.map((currency) => ({
  title: `${currency.flag} ${currency.name} ${currency.prefix}${currency.value}`
}));
alfy.output(output);
