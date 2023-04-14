import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Container>
          {this.props.children}
            </Container>
        <Footer />
      </div>
    );
  }
}
