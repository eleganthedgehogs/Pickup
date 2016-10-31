import React, {Component} from 'react';
import styles from './styles';
import { View, Image } from 'react-native';
import { Title, Button } from 'native-base';
import Hr from 'react-native-hr';
import moment from 'moment';

const lineColor = 'rgba(0, 0, 0, .5)'
const joinGameBtnColor = '#20DA9B';

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
			<View style={styles.container}>
        <View style={styles.innerContainer}>
          
          <Title style={styles.title}>{this.props.game.court.name}</Title>
          <Image source={{uri: this.props.game.court.imageUrl}} style={styles.image} />

          <Title style={styles.title}>Game Type</Title>
          <Hr lineColor={lineColor}/>
          <Title style={styles.stats}>{this.props.game.type}</Title>

          <Title style={styles.title}>Start Time</Title>
          <Hr lineColor={lineColor}/>
          <Title style={styles.stats}>{moment(this.props.game.time).fromNow()}</Title>

          <Title style={styles.title}>Number of Players</Title>
          <Hr lineColor={lineColor}/>
          <Title style={styles.stats}>{this.props.game.playerIds.length}</Title>

          <Button 
            transparent
            onPress={ () => this.props.exitJoinGame() } 
            textStyle={styles.xtext} 
            style={styles.x}>X</Button>
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