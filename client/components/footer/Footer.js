import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SegmentedControlIOS,
  Image
} from 'react-native';

import MapView from'react-native-maps';
import { Container, Header, Title, Text, Content, Footer, FooterTab, Button, Icon} from 'native-base';

class FooterClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <Footer>
       <Button style={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Image source={require('./ruckerpark.jpg')} style={{width: 60, height: 50, alignItems: 'center'}} />
       </Button>
        <FooterTab><Button>Tab2</Button></FooterTab>
    </Footer>
    )
  }
}

module.exports = FooterClass;