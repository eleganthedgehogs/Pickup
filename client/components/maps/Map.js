import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage, AlertIOS } from 'react-native';
import { Container } from 'native-base';
import MapView from 'react-native-maps';
import styles from './styles';
import helper from '../../utils/helper';
import moment from 'moment';

import GameMarker from '../GameMarker/GameMarker';
import CourtMarker from '../CourtMarker/CourtMarker';

import Foot from '../footer/Footer';
import Head from '../header/header';
import CreateGame from '../CreateGame/CreateGame';
import JoinGame from '../JoinGame/JoinGame';
// might need to import both Pickers to obtain the selected gametype and start time values
// import GamePicker from '../GamePicker/GamePicker';
// import TimePicker from '../TimePicker/TimePicker';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitude = 37.78825;
const longitude = -122.4324;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * aspectRatio;
const initialRegion = {latitude, longitude, latitudeDelta, longitudeDelta};
var STORAGE_KEY = 'id_token';

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
      joiningGame: false,
      selectedGameType: '5 on 5',
      selectedGameTime: new Date(),
      segmentedIosIndex: 0
    };

  }


  updateGameType(newGameType) {
    this.setState({
      selectedGameType: newGameType
    })
  }

  updateGameTime(newTimeData) {
    this.setState({
      selectedGameTime: newTimeData
    })
  }

  componentWillMount() {
    helper.getMainData()
          .then( response => this.setState({games: response.data.games, courts: response.data.courts}))
          .catch( error => console.log('this is the error') );
  }

  // componentWilUpdate() {
  //   // helper.getMainData()
  //   //       .then( response => this.setState({games: response.data.games, courts: response.data.courts}))
  //   //       .catch( error => console.log('this is the error') );
  // }

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
              countdown={moment(game.time).fromNow()}
              // countdown={game.time}

              />
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

  handleSubmitGame() {
    helper.getMainData()
      .then(response => {
        this.setState({segmentedIosIndex: 0, games: response.data.games, courts: response.data.courts, creatingGame: false, mode: 'Current Games'}, () => {
          this.renderGames();
        });
      })
      .catch(error => console.log('this is the error:', error));
  }

  renderCreateGame() {
    return (
      <CreateGame ref="createGameData"
        onGameTypeChange= {this.updateGameType.bind(this)}
        onTimeDataChange= {this.updateGameTime.bind(this)}
        exitCreateGame={ () => this.setState({creatingGame: false, mode: 'Create a Game'})}
        submitGame={() => this.handleSubmitGame()}
        postGame={ () => helper.postNewGame({
          type: this.state.selectedGameType,
          playerIds: ['12345'],
          time: this.state.selectedGameTime,
          court: this.state.selectedCourt.name
          })
        }/>
   )
  }

  //grabs the json token stored in the app's AsyncStorage
  async _getToken(game) {
    try {
      let token = await AsyncStorage.getItem(STORAGE_KEY);
      helper.joinGame(game, token)
      .then(response => AlertIOS.alert('You have been added to the game. BALL OUT!'))
      .catch(error => AlertIOS.alert('You are already a part of this game. BALL OUT!'))
    } catch (error) {
      console.log('AsyncStorage error getting token: ' + error.message);
    }
  }

  renderJoinGame() {
    return (
      <JoinGame
        game={this.state.selectedGame} 
        exitJoinGame={ () => this.setState({joiningGame: false}) }
        joinGame={ () => { this._getToken(this.state.selectedGame) }}
      />
    )
  }

  render() {
    const iosIndex = this.state.segmentedIosIndex === 0 ? 1 : 0;
    return (
      <Container>

        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion = {initialRegion}>

            <Head ref="headData" switchMode={ mode => this.setState({mode: mode, segmentedIosIndex: iosIndex})} index={this.state.segmentedIosIndex}/>

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

  componentDidUpdate() {
    console.log("State's gameType is:", this.state.selectedGameType);
    console.log("State's newTimeData is:", this.state.selectedGameTime);
  }
}

export default HomeMap;