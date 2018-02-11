const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENT_SPACE,
  accessToken: process.env.CONTENT_TOKEN
});

module.exports.getEntries = (event, context, callback) => {
  console.log(`starting getContent: event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`);
  const entryId = JSON.parse(event.body).entryId;
  return client.getEntries()
    .then((entries) => {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(entries)
      };
      callback(null, response);
    })
    .catch((error) => {
      callback(error, null);
    })
};
