import React, { Component } from 'react';
import HomeMap from './components/maps/Map';
import LogIn from './components/login/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'login'};
  }

  redirect(route) {
    this.setState({view: route});  
  } 

  render() {
    if (this.state.view === 'login') {
      return (
        <LogIn redirect={this.redirect.bind(this)}/>
      )      
    } else if (this.state.view === 'home') {
      return (
        <HomeMap redirect={this.redirect.bind(this)}/>
      )
    }
  }
}

export default App;
