import React, { StyleSheet } from 'react-native';
const markerColor = '#DB343F';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: markerColor,
    padding: 6,
    borderRadius: 20,
    borderColor: markerColor,
    borderWidth: 0.5,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: markerColor,
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: markerColor,
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

export default styles;