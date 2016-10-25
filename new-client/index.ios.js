/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import LogIn from './components/login/login';
import Home from './components/home/home';

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
    if (this.state.view === 'login') {
      return (
        <LogIn redirect={this.redirect.bind(this)}/>
      ) 
      // return <Text>
      //   To get started, edit index.ios.js
      // </Text>   
    } else if (this.state.view === 'home') {
      return (
        <Home redirect={this.redirect.bind(this)}/>
      )
    }
  }
}

AppRegistry.registerComponent('newclient', () => client);