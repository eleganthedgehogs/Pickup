import React, {Component} from 'react';
import styles from './styles';
import { View } from 'react-native';
import { Title, Button } from 'native-base';
import Hr from 'react-native-hr';

const joinGameBtnColor = '#20DA9B';

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
			<View style={styles.container}>
        <Button 
        transparent
        onPress={ () => this.props.exitJoinGame() } 
        textStyle={styles.xtext} 
        style={styles.x}>X</Button>

        <View style={styles.innerContainer}>
          <Title style={styles.title}>Game Type</Title>
          <Hr lineColor='rgba(255, 255, 255, .5)'/>
          <Title style={styles.stats}>{this.props.game.type}</Title>

          <Title style={styles.title}>Start Time</Title>
          <Hr lineColor='rgba(255, 255, 255, .5)'/>
          <Title style={styles.stats}>{this.props.game.time}</Title>

          <Title style={styles.title}>Number of Players</Title>
          <Hr lineColor='rgba(255, 255, 255, .5)'/>
          <Title style={styles.stats}>{this.props.game.playerIds.length}</Title>

          <Button 
            block
            onPress={ () => this.props.joinGame() }
            style={styles.button}>Join Game!</Button>
        </View>
			</View>
		);
  }
}

export default JoinGame;