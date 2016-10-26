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
			     values={['Join', 'Create']} 
			     selectedIndex={0} />
			 </View>
			</View>
		)
	}
}

export default Head;