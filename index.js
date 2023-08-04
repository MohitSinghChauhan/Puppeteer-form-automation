// app.js
const express = require('express');
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const moment = require('moment-timezone');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000; // Change this to the desired port number

app.get('/submit-form', async (req, res) => {
	try {
		await submitForm();
		res.status(200).send('Form submitted successfully');
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while submitting the form');
	}
});

async function submitForm() {
	const data = {
		email: process.env.EMAIL,
		name: process.env.NAME,
		leaveReason: '',
		remarks: '',
		onLeave: 'No',
	};

	const dataArr = Object.values(data);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		'https://docs.google.com/forms/d/e/1FAIpQLSd_ejqtz_OMStoFmBteVRtiA9MMYQNzuaKXlO-ma6fRlAIJ7A/viewform',
		{ waitUntil: 'networkidle2' }
	);
	await page.waitForSelector("input[type='email']", { visible: true });

	const inputs = await page.$$('input.whsOnd.zHQkBf');
	const options = await page.$$('div.AB7Lab.Id5V1');
	const submitbtn = await page.$$('div[role="button"]');

	for (let i = 0; i < inputs.length; i++) {
		await inputs[i].type(dataArr[i]);
	}

	await options[1].click();
	await submitbtn[0].click();

	await page.waitForTimeout(5000);
	await browser.close();
}

// Schedule the task to run at 05:00 PM IST every day
cron.schedule(
	process.env.CRON_TIME,
	() => {
		submitForm()
			.then(() => {
				console.log('Form submitted successfully');
			})
			.catch(console.error);
	},
	{
		scheduled: true,
		timezone: 'Asia/Kolkata', // Change this to the desired timezone
	}
);

app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
});

// const puppeteer = require('puppeteer');

// const data = {
// 	email: 'mohitchauhan.hbtu@gmail.com',
// 	name: 'Mohit Singh Chauhan',
// 	leaveReason: '',
// 	remarks: '',
// 	onLeave: 'No',
// };

// const dataArr = Object.values(data);

// async function main() {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();
// 	await page.goto(
// 		'https://docs.google.com/forms/d/e/1FAIpQLSd_ejqtz_OMStoFmBteVRtiA9MMYQNzuaKXlO-ma6fRlAIJ7A/viewform',
// 		{ waitUntil: 'networkidle2' }
// 	);
// 	await page.waitForSelector("input[type='email']", { visible: true });

// 	const inputs = await page.$$('input.whsOnd.zHQkBf');
// 	const options = await page.$$('div.AB7Lab.Id5V1');
// 	const submitbtn = await page.$$('div[role="button"]');

// 	for (let i = 0; i < inputs.length; i++) {
// 		await inputs[i].type(dataArr[i]);
// 	}

// 	await options[1].click();
// 	await submitbtn[0].click();

// 	await page.waitForTimeout(5000);
// 	await browser.close();
//     await console.log('Form submitted successfully');
// }

// main().catch(console.error);
