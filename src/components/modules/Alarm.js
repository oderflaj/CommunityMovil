import React, { Component } from 'react';
import { View, Text } from 'react-native';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../items/Header'
import * as RestOp from './../functions/RestFunctions';
//import {BodyContain} from './../items/BodyContain'


let args = undefined

class alarm extends Component {
  
  componentWillMount(){
    
    RestOp.getBase().then(r=>{
            //console.log(r.condominio)
            this.args = {
              number: r.condominio.telefono, // String value with the number to call
              prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
            }
        })
  }

  makeCall()
  {
    //call(this.args).catch(console.error) 
  }



  render() {
    let navigate = this.props.navigation;
    this.makeCall()
    return (
      
      <View style={{borderTopColor:"#000", borderTopWidth:24}}>
        <Header navigation={navigate} nameHeader="Alarma"/>
          <Text>
            Alarma Vecinal
            <Icon name="ios-person" size={30} color="#4F8EF7" />
            {/* <BodyContain/> */}
          </Text>        
      </View>
    );
  }
}

export {alarm}