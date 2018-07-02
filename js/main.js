 /* Javascript */
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container';
import '../css/main.css';

class Page extends React.Component {
  render() {
    return (
      <Container/>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('root'));

// if (module.hot) {
//   module.hot.accept('./container.js', function() {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }
