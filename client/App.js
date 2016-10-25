import React, { Component } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import DraggableMarkers from './examples/DraggableMarkers';
import LogIn from './components/login/login';
import Home from './components/home/home';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';


class App extends React.Component {
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
    } else if (this.state.view === 'home') {
      return (
        <DraggableMarkers redirect={this.redirect.bind(this)}/>
      )
    }
  }
}


module.exports = App;
