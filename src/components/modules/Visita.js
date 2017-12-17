import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'

class visita extends Component {

  render() {
    let navigate = this.props.navigation;
    return (
      <Itemx.Canvas>
        <Itemx.Context>
          <Itemx.Header navigation={navigate} nameHeader="Visitas" iconHeader="wc"/>

          <Text>
            Visitas
            <Icon name="ios-person" size={30} color="#4F8EF7" />
          </Text>
        </Itemx.Context>
      </Itemx.Canvas>
      
        
    );
  }
}

export {visita}