'use strict';

const crypto = require('crypto');

module.exports.getEntries = (event, context, callback) => {
  const contentful = require('contentful');
  const client = contentful.createClient({
    space: process.env.CONTENT_SPACE,
    accessToken: process.env.CONTENT_TOKEN
  });

  console.log(`starting getContent: event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`);
  return client.getEntries()
    .then((entries) => {
      const response = getApiResponse(entries);
      console.log('Entries:', entries);
      const etag = crypto.createHash('md5').update(JSON.stringify(entries)).digest("hex");
      console.log('Etag:', etag);
      response.headers.ETag = etag;
      callback(null, response);
    })
    .catch((error) => {
      callback(error, null);
    })
};

module.exports.sendEmail = (event, context, callback) => {
  const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});
  const uuidv4 = require('uuid/v4');

  console.log(`starting sendEmail: event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`);
  const body = JSON.parse(event.body);
  const data = {
    from: `${body.name} <${uuidv4()}@22-weddings.com>`,
    'h:Reply-To': body.email,
    to: process.env.SEND_TO,
    subject: `👰🏼 Message for 22 Weddings & Events!`,
    text: body.message
  };
  console.log('Email data:', data);

  return mailgun.messages().send(data, (error, body) => {
    if (error) {
      callback(error, null);
    }
    const response = getApiResponse({ 'message': 'success' });
    callback(null, response);
  });
};

function getApiResponse(body) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(body)
  };
}
