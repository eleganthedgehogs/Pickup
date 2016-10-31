import React, {Component} from 'react';
import styles from './styles';
import { View } from 'react-native';
import { Title } from 'native-base';
import moment from 'moment'


const MyGameDetails = (props) => {
	return (
		<View style={styles.viewContainer}>
		 <View>
		   <Title style={styles.title}>You have joined a game that starts in {moment(props.game.time).fromNow()}</Title>
		 </View>
		</View>
	)
}

export default MyGameDetails;