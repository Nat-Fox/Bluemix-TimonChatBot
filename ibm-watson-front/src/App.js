import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap';
import InputRenderer from './InputRenderer'


class App extends Component {
  state = {
    message: '',
    lastResponse: '',
    responses: []
  };

  componentDidMount = () => {    
    this.sendMessageToWatson('hola')
  }

  handleChangeMessage = evt => {
    this.setState({
      message: evt.target.value
    });
  }

  sendMessage = () => {
    this.sendMessageToWatson(this.state.message);
  }

  sendMessageToWatson = message => {
    console.info('Message to send to watson', message)
    axios.post('http://localhost:4500/send-message', {message: message})
      .then(response => {
        console.info('response by watson is ', response.data);
        this.setState({
          responses: this.state.responses.concat(response.data.text)
            .concat(response.data.context.inputs) 
        });
      })
      .catch(err => {
        console.info('error ', err);
      });
  }

  selectionHandler = option => {
    console.info('selected option is -> ', option);
    this.sendMessageToWatson(option);
  }

  render() {
    return (
      <div className="App">

        {this.state.responses.map((message, idx) => {          
          return(
            typeof(message) === 'string' ? 
            <div key={idx} className='message-timon'>
              {message}
            </div>  :  <InputRenderer handler={this.selectionHandler} configuration={message} key={idx} />
          ) 
                  
        })}          
        
                
        {/* Iniciar conversación */}        
        <div className="start">
          <Grid>
            <Row className="container-fluid">
              <Col xs={10}>
                <FormControl type="text" value={this.state.message} onChange={this.handleChangeMessage} placeholder="Enviar" />        
              </Col>
              <Col xs={2}>
                <Button className="btn-send" bsStyle="primary" onClick={this.sendMessage}>Enviar</Button>                    
              </Col>
            </Row>
          </Grid>                  
        </div>

      </div>
    );
  }
}

export default App;
