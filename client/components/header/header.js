import React, {Component} from 'react';
import styles from './styles';
import { View, SegmentedControlIOS } from 'react-native';
import { Title } from 'native-base';
const SegmentedControlColor = '#DB343F'


class Head extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			resetRender: this.newFunction
		}
		// setTimeout(() => this.setState({index: 1}), 1000)
	}

	newFunction() {
		var self = this;
		console.log('newFunction');
		this.setState({index: 0}, () => {
			console.log('Inside set state function...');
			self.forceUpdate();
			console.log('State index:', self.state.index)
		})
		console.log('new cl', this.state.index)
	}

	render() {
		return (
			<View style={styles.viewContainer}>
			 <View>
			   <SegmentedControlIOS 
			     style={styles.segmented} 
			     values={['Current Games', 'Create a Game']} 
			     selectedIndex={this.state.index} 	
			     onValueChange={ value => this.props.switchMode(value) } 
			     tintColor={SegmentedControlColor}/>
			 </View>
			</View>
		)
	}
}

export default Head;