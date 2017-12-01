import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
class alarm extends Component {
  static navigationOptions = ({navigation})=>({
    title:'Menu',
    tabBarLabel:'Screen 2',
  })

  render() {
    return (
      <View>
        {/* <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
          Login with Facebook
        </Icon.Button>
        <Icon name="rocket" size={30} color="#900" />
        <MaterialIcons
          name='card-membership'
          size={24}
          style={{color:'red'}}
        /> */}
        <Text>
          No es sano
        </Text>
      </View>
    //   <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    //   Login with Facebook
    // </Icon.Button>
    );
  }
}

export {alarm}