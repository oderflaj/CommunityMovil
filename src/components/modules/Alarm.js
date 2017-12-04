import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import FontAwesome, { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/Ionicons';

class alarm extends Component {
  static navigationOptions = ({navigation})=>({
    title:'Menu',
    tabBarLabel:'Screen 2',
  })

  render() {
    return (
      <View style={{marginTop:20}}>
        {/* <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Login with Facebook
        </Icon.Button>
        <Icon name="rocket" size={30} color="#900" />
        <MaterialIcons
          name='card-membership'
          size={24}
          style={{color:'red'}}
        /> */}
         {/* <FontAwesome>{Icons.chevronLeft}</FontAwesome> */}
        <Text>
          No es sano
          <Icon name="ios-person" size={30} color="#4F8EF7" />
        </Text>
      </View>
    );
  }
}

export {alarm}