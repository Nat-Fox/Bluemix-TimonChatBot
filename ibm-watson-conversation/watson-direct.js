const ConversationV1 = require('watson-developer-cloud/conversation/v1');

const conversation = new ConversationV1({
  username: '1e236292-1f9c-4714-bf3e-960bd34150da',
  password: '6Fqr0DXlLpSU',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

conversation.message(
  {
    input: { text: 'hallo' },
    workspace_id: 'cd43447a-4614-4144-9c06-e053882af1fe'
  },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
    }
  }
);