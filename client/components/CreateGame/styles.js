import React, { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.93)'
  },
  innerContainer: {
    flex: 1,
    marginTop: deviceHeight / 15 + 20
  },
  title: {
    color: 'white',
    marginBottom: 10
  },
  button: {
    padding: 10,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10
  },
  x: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  xtext: {
    color: 'white',
    fontSize: 25,
    lineHeight: 25
  }

});

export default styles;