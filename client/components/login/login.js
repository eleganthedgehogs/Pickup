import React, { Component } from 'react';
import { Container, Content, InputGroup, Input, Button, View, Div } from 'native-base';
import { Image, TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import helper from '../../utils/helper';

const background = require('../images/shadow.png');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      incorrectAttempt: false,
    };
  }

  submitLogin() {
    var self = this;
    var user = {
      email: this.state.email,
      password: this.state.password
    };

    helper.postLogin(user)
    .then(response => self.redirect('home') )
    .catch( error => this.setState({ incorrectAttempt: true }) ); // move this line to .then success callback when server is running
  } 

  redirect(route) {
    this.props.redirect(route);
  }

  signUpAccount() {
    this.redirect('signup');
  }

  render() {
    return (
      <Container style={styles.container}>
        <View>
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
                
                <Text 
                  style={styles.signup} 
                  onPress={() => {this.signUpAccount()}}>
                  Don't have an account, sign up here!
                </Text>

              </View>
            </Image>
          </Content>
          {
            this.state.incorrectAttempt ? 
            <Text style={styles.incorrect}>Username or password is invalid.</Text> :
            <Text></Text>
          }
        </View>
      </Container>
    );
  }
}

export default LogIn;
