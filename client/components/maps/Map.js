import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import PriceMarker from './PriceMarker';
import { Container } from 'native-base';
import Foot from '../footer/Footer';
import styles from './styles';
import Head from '../header/header';
import helper from '../../utils/helper';
import CreateGame from '../CreateGame/CreateGame';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitude = 37.78825;
const longitude = -122.4324;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * aspectRatio;
const SPACE = 0.01;
const initialRegion = {latitude, longitude, latitudeDelta, longitudeDelta};

class HomeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      selectedGame: false
    };
  }

  componentWillMount() {
    var self = this;
    // use AXIOS to grab data from backend
    helper.getMainData()
    .then(function(response) {
      self.setState({games: response.data.data});
      console.log(self.state.games);
    })
    .catch(function(error) {
      console.log('this is the error');
    });
  }

  render() {
    console.log(this.state.games);
    var self = this;
    return (
      <Container>

        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion = {initialRegion}>
            <Head />

            {this.state.games.map((game, i) => (
              <MapView.Marker 
                onPress={ event => self.setState({selectedGame: game}) }
                coordinate={{latitude: game.court.latitude, longitude: game.court.longitude}} 
                key={i}>
                  <PriceMarker 
                    amount={game.playerIds.length} 
                    countdown={game.time}/>
              </MapView.Marker>
            ))}

          </MapView>
        <Foot game={self.state.selectedGame}/>
        <CreateGame />

        </View>

      </Container>
    );
  }
}

export default HomeMap;