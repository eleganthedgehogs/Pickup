import React from 'react';
import { Image, View } from 'react-native';
import { Footer, FooterTab, Button, Title } from 'native-base';
import styles from './styles';

class Foot extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGameInfo() {
    if (this.props.game) {
      return (
        <Footer>
          <Image source={{uri: this.props.game.court.imageUrl}} style={styles.image} />
          <Title>{this.props.game.court.name}</Title>
        </Footer>
      )
    } else {
      return (  
        <Footer><Title>Please select a game</Title></Footer>
      )
    }
  }

  renderCourtInfo() {

  }

  render() {
    return (
      <Footer>
        { this.props.mode === 'Current Games' ? this.renderGameInfo() : this.renderCourtInfo() }
      </Footer>
    ) 
  }
}

export default Foot;