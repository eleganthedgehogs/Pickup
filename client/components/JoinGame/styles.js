import React, { StyleSheet, Dimensions } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const joinGameBtnColor = '#20DA9B';
const backgroundColor = 'rgba(0, 0, 0, 0.93)';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: backgroundColor
  },
  innerContainer: {
    flex: 1,
    marginTop: deviceHeight / 17
  },
  title: {
    color: 'white',
    marginBottom: 10
  },
  button: {
    padding: 10,
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: joinGameBtnColor
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
  },
  stats: {
    fontSize: 60,
    lineHeight: 60,
    color: 'white',
    marginTop: 40,
    marginBottom: 30
  }

});

export default styles;