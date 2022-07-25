import alfy from 'alfy';
import puppeteer from "puppeteer";

// [INPUT]
const input = alfy.input.trim();

// [PROCESS]
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const moedaBase = `${input} dolar`;
const moedaFinal = 'real';
const currencyUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`;
await page.goto(currencyUrl);
const resultado = await page.evaluate(() => {
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
});
await browser.close();


const currencies = [
    {
        flag: '🇧🇷',
		name: 'BRL',
		prefix: "R$",
		value: resultado,
	},
	{
        flag: '🇺🇸',
		name: 'USD',
		prefix: "$",
		value: input,
	}
];

// [OUTPUT]
const output = currencies.map((currency) => ({
	title: `${currency.flag} ${currency.prefix}${currency.value} - ${currency.name} `
}));
alfy.output(output);
