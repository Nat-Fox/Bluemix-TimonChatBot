import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

const InputRenderer = (props) => {
  console.log('configuration', props.configuration)

  let type = props.configuration ? props.configuration.type: false;

  switch(type) {
    case 'selection':
      return (<Grid>
            <Row className="container-fluid">
              {props.configuration.options.map((option, idx) => {
                return (<Col xsPush={1} xs={5} key={idx}>
                  <Button className="btn-action" onClick={() => {
                      props.handler(option);
                    }}>{option}
                  </Button>
                </Col>)             
              })}
            </Row>
            </Grid>)      
      default:
        return ''
  }
}

export default InputRenderer;