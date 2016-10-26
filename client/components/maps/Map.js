import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import PriceMarker from './PriceMarker';
import { Container } from 'native-base';
import Foot from '../footer/Footer';
import styles from './styles';
import Head from '../header/header';
import helper from '../../utils/helper';
import axios from 'axios';

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
    axios.get('http://localhost:8000/api/main')
    .then(function(response) {
      self.setState({games: response.data.data});
      console.log(self.state.games);
    })
    .catch(function(error) {
      console.log('this is the error');
    });
    // this.state.games.push({
    //   players: [1,2,3,4,5],
    //   time: 90,
    //   court: 'Baller Court',
    //   lat: latitude + SPACE,
    //   long: longitude - SPACE
    // }, {
    //   players: [1,2,3,4,5,6,7,8],
    //   time: 30,
    //   court: 'Supa Court',
    //   lat: latitude - SPACE,
    //   long: longitude + SPACE
    // }, {
    //   players: [1,2],
    //   time: 120,
    //   court: 'Dupa Court',
    //   lat: latitude - SPACE - 0.01,
    //   long: longitude + SPACE + 0.01
    // })
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
        </View>
      </Container>
    );
  }
}

module.exports = HomeMap;