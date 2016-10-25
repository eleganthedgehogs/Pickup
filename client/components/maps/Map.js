import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView from'react-native-maps';
import PriceMarker from './PriceMarker';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class HomeMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      b: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      games: []
    };
  }

  componentWillMount() {
    this.state.games.push({
      players: [1,2,3,4,5],
      time: 90,
      court: 'Baller Court',
      lat: LATITUDE + SPACE,
      long: LONGITUDE - SPACE
    }, {
      players: [1,2,3,4,5,6,7,8],
      time: 30,
      court: 'Supa Court',
      lat: LATITUDE - SPACE,
      long: LONGITUDE + SPACE
    }, {
      players: [1,2],
      time: 120,
      court: 'Dupa Court',
      lat: LATITUDE - SPACE - 0.01,
      long: LONGITUDE + SPACE + 0.01
    })
  }

  render() {
    var self = this;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {this.state.games.map((game, i) => (
            <MapView.Marker coordinate={{
              latitude: game.lat,
              longitude: game.long
            }} key= {i}>
                <PriceMarker amount={game.players.length} countdown={game.time}/>
            </MapView.Marker>
        ))}
        </MapView>
      </View>
    );
  }
}

HomeMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = HomeMap;
