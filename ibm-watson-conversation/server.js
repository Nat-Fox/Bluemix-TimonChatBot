const ConversationV1 = require('watson-developer-cloud/conversation/v1');

const conversation = new ConversationV1({
  username: '1e236292-1f9c-4714-bf3e-960bd34150da',
  password: '6Fqr0DXlLpSU',
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());


app.get('/', (req, res) => {
    res.send({message: 'Bluemix sample API'});
});


app.post('/send-message', (req, res) => {
    console.info('parametros recibidos -> ', req.body);
        
    // llamada SDK node watson conversation
    conversation.message(
        {        
          input: { text: req.body.message },
          workspace_id: 'cd43447a-4614-4144-9c06-e053882af1fe'
        },
        function(err, response) {
          console.log('responsa', JSON.stringify(response, null, 4))
          if (err) {
            console.error(err);
          } else {
            res.send({
              text: response.output.text,
              context: response.context
            });
          }
        }
      );
});



app.listen(4500, () => {
    console.info('server started');
});