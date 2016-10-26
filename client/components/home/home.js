import React, { Component } from 'react';
import { Container, Content, Title, Header, Button, View, Footer} from 'native-base';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Axios from 'axios';
import MapView from 'react-native-maps';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	redirect(route) {
		this.props.redirect(route);
	}

	render() {
    return (
      <Container>
        <Header>
          <Title>Home</Title>
        </Header>

          <MapView
           initialRegion={{
             latitude: 37.78825,
             longitude: -122.4324,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0420,
           }}
         />
        <Content>
        </Content>

        <Footer>

        </Footer>
      </Container>
    );
  }
}

export default Home;
