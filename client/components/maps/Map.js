import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Container } from 'native-base';
import MapView from 'react-native-maps';
import styles from './styles';
import helper from '../../utils/helper';

import GameMarker from '../GameMarker/GameMarker';
import CourtMarker from '../CourtMarker/CourtMarker';

import Foot from '../footer/Footer';
import Head from '../header/header';
import CreateGame from '../CreateGame/CreateGame';
import JoinGame from '../JoinGame/JoinGame';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitude = 37.78825;
const longitude = -122.4324;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * aspectRatio;
const initialRegion = {latitude, longitude, latitudeDelta, longitudeDelta};

class HomeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      courts: [],
      selectedGame: false,
      selectedCourt: false,
      mode: 'Current Games',
      creatingGame: false,
      joiningGame: false
    };
  }

  componentWillMount() {
    helper.getMainData()
          .then( response => this.setState({games: response.data.games, courts: response.data.courts}))
          .catch( error => console.log('this is the error') );
  }

  renderGames() {
    let self = this;
    return (
      this.state.games.map((game, i) => (
        <MapView.Marker 
          onPress={ event => self.setState({selectedGame: game}) }
          coordinate={{latitude: game.court.latitude, longitude: game.court.longitude}} 
          key={i}>
            <GameMarker 
              amount={game.playerIds.length} 
              countdown={game.time}/>
        </MapView.Marker>
      ))
    )
  }

  renderCourts() {
    let self = this;
    return (
      this.state.courts.map((court, i) => (
        <MapView.Marker 
          onPress={ event => self.setState({selectedCourt: court}) }
          coordinate={{latitude: court.latitude, longitude: court.longitude}} 
          key={i}>
            <CourtMarker 
              name={court.name}/>
        </MapView.Marker>
      ))
    )
  }

  renderCreateGame() {
    return (
      <CreateGame 
        exitCreateGame={ () => this.setState({creatingGame: false}) }
        postGame={ () => helper.postNewGame(this.state.selectedCourt)}/>
    )
  }

  renderJoinGame() {
    return (
      <JoinGame
        game={this.state.selectedGame} 
        exitJoinGame={ () => this.setState({joiningGame: false}) }
        joinGame={ () => helper.joinGame(this.state.selectedGame)}/>
    )
  }

  render() {
    return (
      <Container>

        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion = {initialRegion}>

            <Head switchMode={ mode => this.setState({mode: mode})}/>

            {this.state.mode === 'Current Games' ? this.renderGames() : this.renderCourts()}
          </MapView>

          {this.state.creatingGame && this.renderCreateGame()}
          {this.state.joiningGame && this.renderJoinGame()}

          <Foot 
            game={this.state.selectedGame} 
            court={this.state.selectedCourt} 
            mode={this.state.mode}
            createGame={() => this.setState({creatingGame: true})}
            joinGame={() => this.setState({joiningGame: true})}/>


        </View>
      </Container>
    );
  }
}

export default HomeMap;