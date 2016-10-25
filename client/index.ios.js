/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LogIn from './components/login/login'

export default class client extends Component {
	constructor(props) {
		super(props);
		this.state = {view: 'login'};
	}

  redirect(route) {
  	console.log("setting state here");
  	this.setState({view: route});
  	console.log(this.state.view);
  } 

  render() {
    return (
      <LogIn redirect={this.redirect.bind(this)}/>
    );
  }
}

AppRegistry.registerComponent('client', () => client);
