import React, { Component } from 'react';
import { View, Text } from 'react-native';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';



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
      
      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Alarma"/>
          <Itemx.Context>  
            <Text style={{fontSize:14 }}>
              Alarma Vecinalssssssssssssssss
              {/* <Icon name="ios-person" size={30} color="#4F8EF7" /> */}
            </Text>        
          </Itemx.Context>
      </Itemx.Canvas>
    );
  }
}

export {alarm}