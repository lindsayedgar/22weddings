const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENT_SPACE,
  accessToken: process.env.CONTENT_TOKEN
});

module.exports.getContent = (event, context, callback) => {
  console.log(`starting getContent: event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`);
  const entryId = JSON.parse(event.body).entryId;
  return client.getEntry(entryId)
    .then((entry) => entry)
    .catch(console.error)
};
