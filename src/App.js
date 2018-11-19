import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import Header from './base/header.js';
import Nav from './base/nav.js';
import Routes from './views/routes.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className='fixed'>
    			<Header />
    			<Nav/>
    		</div>
    		<div className='content'>
        	<Routes />
        </div>
      </div>
    );
  }
}

export default App;
