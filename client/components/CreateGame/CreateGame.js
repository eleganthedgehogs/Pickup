import React, {Component} from 'react';
import styles from './styles';
import { View } from 'react-native';
import { Title, Button } from 'native-base';
import Hr from 'react-native-hr';
import GamePicker from '../GamePicker/GamePicker';
import TimePicker from '../TimePicker/TimePicker';

class CreateGame extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<View style={styles.container}>
			 <Button transparent textStyle={styles.xtext} style={styles.x}>X</Button>

			 <View style={styles.innerContainer}>
			 	<Title style={styles.title}>Game Type</Title>
			  <Hr lineColor='rgba(255, 255, 255, .5)'/>
			  <GamePicker />

			  <Title style={styles.title}>Start Time</Title>
			  <Hr lineColor='rgba(255, 255, 255, .5)'/>
			  <TimePicker />
			  
			  <Button block success style={styles.button}>Let's Play!</Button>
			 </View>
			</View>
		)
	}
}

export default CreateGame;