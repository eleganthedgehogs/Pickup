import React, {Component} from 'react';
import styles from './styles';
import { View, PickerIOS } from 'react-native';

const PickerItemIOS = PickerIOS.Item;
const GAME_TYPES = ['Open', '5 on 5', '3 on 3', '21', 'Horse', 'Shirts & Skins'];


class GamePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
    	gameType: GAME_TYPES[1]
	  };
	}

	render() {
		return (
	    <PickerIOS
		 		itemStyle={ styles.itemStyle }
	      selectedValue={this.state.gameType}
	      onValueChange={ gameType => {
	      	this.setState({gameType}, () => this.props.onGameTypeChange(this.state.gameType))
      	}}>
	      {GAME_TYPES.map((gameType) => (
		      <PickerItemIOS 
		        key={gameType}
		        value={gameType}
		        label={gameType}/>
		      ))}
    	</PickerIOS>	
		)
	}
}

export default GamePicker;