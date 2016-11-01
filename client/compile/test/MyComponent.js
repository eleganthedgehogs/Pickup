import _reactNative from 'react-native';
// var _reactNative2=_interopRequireDefault(_reactNative);
import _chai from 'chai';
import TimePicker from '../../components/TimePicker/TimePicker';
import GamePicker from '../../components/GamePicker/GamePicker';
import CourtMarker from '../../components/CourtMarker/CourtMarker';
import React from 'react-native';

var _enzyme=require('enzyme');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj:{default:obj};
}

describe('pickup App',function(){
	it('Should have PickerIOS component in GamePicker', () => {
    const wrapper = _enzyme.shallow(<GamePicker />);    
    _chai.expect(wrapper.name()).to.equal('PickerIOS');
  });

	it('should find DatePickerIOS component in TimePicker', () => {
    const wrapper = _enzyme.shallow(<TimePicker />);
    _chai.expect(wrapper.length).to.equal(1);
    _chai.expect(wrapper.find(_reactNative.DatePickerIOS)).to.have.length(1);
  });

	it('expects CourtMarker to be an instance of CourtMarker', () => {
    const wrapper = _enzyme.shallow(<CourtMarker />);
    const inst = wrapper.instance();
    _chai.expect(inst).to.be.instanceOf(CourtMarker);
  });

});

/* 
Test utility is from Leland Richardson @
https://medium.com/@thisbejim/testing-react-native-components-with-enzyme-d46bf735540#.xcwgph2dp
*/