import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    message: '',
    lastResponse: ''
  };

  handleChangeMessage = evt => {
    this.setState({
      message: evt.target.value
    });
  }

  sendMessage = () => {
    axios.post('http://localhost:4500/send-message', {message: this.state.message})
      .then(response => {
        console.info('response by watson is ', response.data.watson);
        this.setState({
          lastResponse: response.data.watson
        });
      })
      .catch(err => {
        console.info('error ', err);
      });

    console.info('message is ', this.state.message);
  }

  render() {
    return (
      <div  style={{marginTop: '100px'}} className="App">
        <input type="text" value={this.state.message} onChange={this.handleChangeMessage}/>
        <br/>
        <button onClick={this.sendMessage}>Enviar</button>

        <div>
          <strong>Last watson response</strong>
          {this.state.lastResponse}
        </div>
      </div>
    );
  }
}

export default App;
