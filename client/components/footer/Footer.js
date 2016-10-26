import React from 'react';
import { Image } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import styles from './styles';

class Foot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.game) {
      return ( 
        <Footer>
          <Button style={styles.button}>
            <Image source={{uri: this.props.game.court.imageUrl}} style={styles.image} />
          </Button>

          <FooterTab>
            <Button>{this.props.game.court.name}</Button>
          </FooterTab>
        </Footer>
      )
    } else {
    return (  
       <Footer>
        <FooterTab><Button>Please select a game</Button></FooterTab>
       </Footer>
       )
    }
  }
}

module.exports = Foot;