import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import {connect} from 'react-redux'

let args = undefined

class alarm extends Component {
  constructor(props){
    super(props)
    this.state = {number:undefined, args:undefined}

  }

  componentWillMount(){
    
    RestOp.getBase().then(r=>{
            //console.log(r.condominio)
            this.args = {
              number: r.condominio.telefono, // String value with the number to call
              prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
            }
            this.setState({number:r.condominio.telefono})
            this.setState({args:{number:r.condominio.telefono,promp:false}})
        })
  }

  makeCall()
  {
    Alert.alert(
      'CONFIRMACION',
      '¿Realizar llamada de emergencia?',
      [
        
        {text: 'ACEPTAR', onPress: () => call(this.args).catch(console.error)},
        {text: 'CANCELAR', onPress: () => console.log('No realizo la llamada'),  style: 'cancel'},
      ],
      { cancelable: false }
    )
  }



  render() {
    console.debug("En Alarma",this.props)
    if(this.props.notification.modulo !== "Alarm"){
        this.props.navigation.navigate(this.props.notification.modulo,this.props.notification.objeto)
    }
    let navigate = this.props.navigation;
    
    const {textStyle, buttonStyle, mainShow} = styles;
    return (

      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Alarma" iconHeader="rss-feed" />
          <Itemx.Context>
            
            <Text style={{fontSize:22, fontWeight:'bold' }}>
              INSTRUCCIONES:
              {/* <Icon name="ios-person" size={30} color="#4F8EF7" /> */}
            </Text>
            <View style={mainShow}>
              <Text style={{fontSize:18}}>
                Presione el botón de emergencia para que sea comunicado a caseta marcando el número:
              </Text>
              <Text style={{fontSize:30,fontWeight:'bold', alignSelf:'center'}}>
                {this.state.number}
              </Text>
              <TouchableOpacity
                style={buttonStyle}
                onPress={()=>this.makeCall()}
              >
                <Text style={textStyle}>
                    EMERGENCIA
                </Text>
              </TouchableOpacity>
            </View>
            
          </Itemx.Context>
      </Itemx.Canvas>
    );
  }
}

const styles={
  textStyle:{
      
      alignSelf: 'center',
      color: '#FFFFFF',
      fontSize: 35,
      fontWeight: '600',
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 15,
      paddingRight: 15
  },
  buttonStyle:{
   
      alignSelf:'stretch',
      backgroundColor: '#C94155',
      borderRadius: 5,
      borderWidth:0,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 15
      
  },
  mainShow:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent:'flex-start'
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notiCommunity
  }
}

export default connect(mapStateToProps)(alarm)
