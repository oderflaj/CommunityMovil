import React, { Component } from 'react';
import { View, Text,WebView } from 'react-native';
//import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'

class edoCuenta extends Component {

  render() {
    let navigate = this.props.navigation;
    return (
      
      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Estado Cuenta" iconHeader="confirmation-number"/>
        <Itemx.Context>
        <Text>
            Estado de Cuenta
            <Icon name="ios-person" size={30} color="#4F8EF7" />
          </Text>
          <WebView
            source={{uri: 'http://community.tecstrag.com/Edoctacondominio/EdoctaDashboard?periodo=201802%20&print=1'}}
            style={{marginTop: 20}}
          />
        </Itemx.Context>
      </Itemx.Canvas>
      
    );
  }
}

export {edoCuenta}