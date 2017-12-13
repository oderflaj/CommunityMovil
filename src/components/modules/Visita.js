import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../items/Header'

class visita extends Component {

  render() {
    let navigate = this.props.navigation;
    return (
      <View style={{borderTopColor:"#000", borderTopWidth:24}}>
        <Header navigation={navigate} nameHeader="Visitas"/>

        <Text>
          Visitas
          <Icon name="ios-person" size={30} color="#4F8EF7" />
        </Text>
      </View>
    );
  }
}

export {visita}