//Import a Library to help create a component
import React from 'react';
import {  AppRegistry, 
          View, 
          Text,
          Image,
          StyleSheet
        } from 'react-native';
import Login from './src/components/Login';



//Create a component

export default class App extends React.Component{
  
  render(){
    return(
      
      <View style={stylex.bgLogin}>
			<Image 
			  style={stylex.bgLogin}
			  source={require('./src/image/bgLogin.png')}
			/>
			<Login/>
		</View>
    );
  }
}

const stylex =StyleSheet.create({
  bgLogin:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    alignSelf: 'center',
    height: '100%',
    width: '100%'
  }
});


//Render it to a device
AppRegistry.registerComponent("Community", ()=>App);

