//Import a Library to help create a component
import React, { Component } from 'react';
import {  AppRegistry, 
          View, 
          Text,
          Image,
          StyleSheet,
          AsyncStorage
        } from 'react-native';
//import Login from './src/components/Login';
//import Pages from './src/components/Pages';
import BasePage from './src/components/BasePage';
import * as RestOp from './src/components/functions/RestFunctions';




// Generic Password, service argument optional
//RestOp.login();

//Create a component

export default class App extends React.Component{
  
  // constructor(props)
  // {
  //   this.state={logedUser:false}
  // }
  

  render(){
    
    // let x
    
    // await RestOp.isLoged().then(x =>JSON.parse(x)).then(obj=>{
    //   console.log("----->>>>>",obj)
    //   x = obj
    // });
    
    ////console.log("Es una X->",x)
    ////AsyncStorage.setItem('usuario','oderflaj@gmail.com')
    //// AsyncStorage.getItem('usuario', (error, result) => {
    ////   console.log(result);
    ////   console.log(error);
    //// });
//
    //// AsyncStorage.getItem('password', (error, result) => {
    ////   console.log(result);
    ////   console.log(error);
    //// });

    //// AsyncStorage.getItem('token', (error, result) => {
    ////   console.log(result);
    ////   console.log(error);
    //// });

    // if(x){
    //   return(
        
    //           <View style={stylex.bgLogin}>
    //             <Image 
    //               style={stylex.bgLogin}
    //               source={require('./src/image/bgLogin.png')}
    //             />
    //             <Login/>
    //           </View>
    //   );
    // }
    // else{
    //   return(
    //     <View>
    //       <Text>
    //         Pantalla nueva
    //       </Text>
    //     </View>
    //   );
    // }

    return(
      <BasePage/>
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

