import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        </Itemx.Context>
      </Itemx.Canvas>
      
    );
  }
}

export {edoCuenta}