import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'

class areaComun extends Component {

  render() {
    let navigate = this.props.navigation;
    return (
      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Area Común" iconHeader="toys"/>
        <Itemx.Context>
          <Text>
            Area Comun
            <Icon name="ios-person" size={30} color="#4F8EF7" />
          </Text>
        </Itemx.Context>
      </Itemx.Canvas>
    );
  }
}

export {areaComun}