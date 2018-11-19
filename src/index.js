import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './base.css';
import {
  BrowserRouter as Router} from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer/reducer'
let data={
	list:[],
	hash:''
}
let store = createStore(reducer,data);

ReactDOM.render(
	<Provider store={store}>
	<Router>
  		<App />
	</Router>
	</Provider>, document.getElementById('root'));
