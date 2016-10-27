import React, {Component} from 'react';
import styles from './styles';
import { View, SegmentedControlIOS } from 'react-native';
import { Title } from 'native-base';


class Head extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<View style={styles.viewContainer}>
			 <Title style={styles.viewHeader}>Pickup</Title>
			 <View>
			   <SegmentedControlIOS 
			     style={styles.segmented} 
			     values={['Current Games', 'Create a Game']} 
			     selectedIndex={0} 	
			     onValueChange={ value => this.props.switchMode(value) } />
			 </View>
			</View>
		)
	}
}

export default Head;