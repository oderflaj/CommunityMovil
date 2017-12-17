import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'

class aviso extends Component {

  render() {
    let navigate = this.props.navigation;
    return (
      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Avisos" iconHeader="notifications-active"/>
        <Itemx.Context>
          <Text>
            Aviso Vecinal
            <Icon name="ios-person" size={30} color="#4F8EF7" />
          </Text>
        </Itemx.Context>
      </Itemx.Canvas>
      
    );
  }
}

export {aviso}