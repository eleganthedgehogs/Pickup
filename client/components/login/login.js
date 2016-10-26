import React, { Component } from 'react';
import { Container, Content, InputGroup, Input, Button, View } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';
import Axios from 'axios';

const background = require('../images/shadow.png');

class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	submitLogin() {
		var self = this;
		Axios.post('/api/signin', {
	    email: this.state.email,
	    password: this.state.password
	  })
	  .then( response => console.log('redirecting to home page') )
	  .catch( error => self.redirect('home') ); // move this line to .then success callback when server is running
  } 

	redirect(route) {
    this.props.redirect(route)
  }

	render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  
                  <Input 
                  	placeholder="EMAIL" 
                  	onChangeText={ email => this.setState({ email }) } />
                  
                </InputGroup>
                <InputGroup style={styles.input}>
                  
                  <Input
                    placeholder="PASSWORD" 
                    onChangeText={ password => this.setState({ password }) }
                    secureTextEntry />

                </InputGroup>
                <Button 
                		style={styles.btn} 
                		onPress={() => this.submitLogin()} >
                  Login
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

export default LogIn;
