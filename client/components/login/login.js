import React, { Component } from 'react';
import { Container, Content, InputGroup, Input, Button, View } from 'native-base';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const background = require('../../images/shadow.png');

class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		}
	}

	render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
                  
                  <Input placeholder="EMAIL" onChangeText={name => {
                  	this.setState({ name });
                  	console.log(this.state.name); 
                  }}/>
                  
                </InputGroup>
                <InputGroup style={styles.input}>
                  
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry
                  />
                </InputGroup>
                <Button style={styles.btn} onPress={() => console.log('himeme')}>
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
