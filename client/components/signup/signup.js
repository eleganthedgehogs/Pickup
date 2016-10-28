import React, { Component } from 'react';
import { Container, Content, InputGroup, Input, Button, View, Text, Div } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';
import helper from '../../utils/helper';

const background = require('../images/shadow.png');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      incorrectAttempt: false
    };
  }

  submitSignup() {
    var self = this;
    var user = {
      email: this.state.email,
      password: this.state.password
    };

    helper.postSignUp(user)
    .then(response => self.redirect('home') )
    .catch( error => this.setState({ incorrectAttempt: true }) ); // move this line to .then success callback when server is running
  } 

  redirect(route) {
    this.props.redirect(route);
  }

  logInAccount() {
    this.redirect('login');
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
                    onChangeText={ email => this.setState({ email }) }
                    autoCorrect={false}
                    autoCapitalize="none" />
                  
                </InputGroup>
                <InputGroup style={styles.input}>
                  
                  <Input
                    placeholder="PASSWORD" 
                    onChangeText={ password => this.setState({ password }) }
                    secureTextEntry />

                </InputGroup>
                <Button 
                  style={styles.btn} 
                  onPress={() => this.submitSignup()} >
                  Sign Up
                </Button>

                <Text 
                  style={styles.login} 
                  onPress={() => {this.logInAccount()}}>
                  Already have an account? Log in here!
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

export default SignUp;