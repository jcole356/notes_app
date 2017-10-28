 /* Javascript */
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container'

class Page extends React.Component {
  render() {
    return (
      <Container/>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
