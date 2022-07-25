import alfy from 'alfy';

// [INPUT]
const input = alfy.input;

// [PROCESS]
const currencies = [
	{
		flag: '🇧🇷',
		name: 'BRL',
		prefix: "R$",
		value: input,
	},
	{
		flag: '🇺🇸',
		name: 'USD',
		prefix: "$",
		value: input,
	}
];
const output = currencies.map((currency) => ({
	title: `${currency.flag} ${currency.prefix}${currency.value} - ${currency.name} `
}));

// [OUTPUT]
alfy.output(output);
