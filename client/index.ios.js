/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LogIn from './components/login/login'

export default class client extends Component {
  render() {
    return (
      <LogIn />
    );
  }
}

AppRegistry.registerComponent('client', () => client);
