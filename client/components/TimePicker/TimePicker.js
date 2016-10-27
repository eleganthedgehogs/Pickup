import React, {Component} from 'react';
import styles from './styles';
import { View, DatePickerIOS } from 'react-native';

class TimePicker extends Component {

	static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 6
  }

	constructor(props) {
		super(props);
		this.state = {
	    date: this.props.date,
	    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
	  };
	}

	render() {
		return (
			<View >
		    <DatePickerIOS	    	
	        date={this.state.date}
	        mode="time"
	        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
	        onDateChange={date => this.setState({date: date}) }
	      />	
      </View>
		)
	}

}

export default TimePicker;

/*************************************************************
To change the text color of DatePickerIOS, we need to refactor
code in react-native node modules client. (10/26/2016)
https://github.com/facebook/react-native/issues/4473
**************************************************************/