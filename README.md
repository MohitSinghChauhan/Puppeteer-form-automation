# Puppeteer form automation

This project uses [Puppeteer](https://github.com/puppeteer/puppeteer) to automatically fill and submit a Google Forms survey daily.

## Usage

The `app.js` file contains the main logic. It starts an Express server with one endpoint:

```
/submit-form
```

Calling this endpoint will launch Puppeteer, navigate to the form URL, fill in the form fields, and submit the form.

The form fields are populated from a `data` object:

```js
const data = {
  email: 'johndoe@email.com',
  name: 'John Doe',
  // etc
};
```

The form URL and other configuration is set via environment variables in a `.env` file.

The form submission is also scheduled to run daily using [node-cron](https://www.npmjs.com/package/node-cron).

## Installation

```
npm install
```

## Configuration

Copy the `.env.example` file to `.env` and update the values:

- `FORM_URL` - Google Form URL
- `EMAIL` - Email to use 
- `NAME` - Name to use

## Running the server

```
npm start
```

## Scheduling form submissions 

The `node-cron` schedule is configured to run at 5:00 PM IST daily. This can be updated in `app.js`.

## Notes

- Remember to fill the Google Form with dummy data to avoid spamming real inboxes!
- The timezone is set to Asia/Kolkata but can be updated

## License

MIT
