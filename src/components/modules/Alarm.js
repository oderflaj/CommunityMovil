import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import Splash from './../Splash'
import {connect} from 'react-redux'

let args = undefined

class alarm extends Component {
  constructor(props){
    super(props)
    this.state = {number:undefined, args:undefined, argsase:undefined, asesor:'',usuario:'', nomCondominio:'', emailContacto:''}

  }

  componentWillMount(){
    
    RestOp.getBase().then(r=>{
            // this.args = {
            //   number: r.condominio.telefono, // String value with the number to call
            //   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
            // }
            
            // this.argsase = {
            //   number: r.condominio.telContacto, // String value with the number to call
            //   prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
            // }
            //this.setState({number:r.condominio.telefono})
            this.setState({args:{number:r.condominio.telefono,promp:false}})
            this.setState({argsase:{number:r.condominio.telContacto,promp:false}})
            this.setState({usuario:r.usuario.nombre})
            this.setState({asesor:r.condominio.nomContacto})
            this.setState({nomCondominio:r.condominio.nombre})
            this.setState({emailContacto:r.condominio.emailContacto})
        })
  }

  makeCall()
  {
    Alert.alert(
      'CONFIRMACION',
      '¿Realizar llamada a su asesor?',
      [
        
        {text: 'ACEPTAR', onPress: () => call(this.state.argsase).catch(console.error)},
        {text: 'CANCELAR', onPress: () => console.log('No realizo la llamada'),  style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  makeCallEmergency()
  {
    Alert.alert(
      'CONFIRMACION EMERGENCIA',
      '¿Realizar llamada a caseta de entrada?',
      [
        
        {text: 'ACEPTAR', onPress: () => call(this.state.args).catch(console.error)},
        {text: 'CANCELAR', onPress: () => console.log('No realizo la llamada'),  style: 'cancel'},
      ],
      { cancelable: false }
    )
  }


  render() {
    
    if(this.props.notification.modulo !== "Alarm"){
        this.props.navigation.navigate(this.props.notification.modulo,this.props.notification.objeto)
    }
    let navigate = this.props.navigation;
    
    const {textStyle, buttonStyle, mainShow, faceAse, styletext,generalcontent} = styles;

    if(this.state.emailContacto==undefined)
    {
        return(<Splash/>)
    }
    else
    {
      return (
      
        <Itemx.Canvas>
          <Itemx.Header navigation={navigate} nameHeader="Inicio" iconHeader="rss-feed" />
            <Itemx.Context>
              
              <View style={[faceAse]}>
                <Icon color='#BF05A9' name='account-circle' size={100} />
                <View style={{flex:1, justifyContent:'center'}}>
                  <View style={generalcontent}>
                    <Text style={styletext}>
                      BIENVENID@ {this.state.usuario}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={mainShow}>
                <View style={generalcontent}>
                  <Text style={styletext}>
                    Soy {this.state.asesor}, tu asesor en:
                  </Text>
                </View>
                <View style={generalcontent}>
                  <Text style={[styletext,{fontSize:20,color:'#BF05A9'}]}>
                    {this.state.nomCondominio}
                  </Text>
                </View>
                <View style={generalcontent}>
                  <Text style={styletext}>
                    Email: {this.state.emailContacto}
                  </Text>
                </View>
                <View style={generalcontent}>
                  <Text style={[styletext,{color:'#BF05A9'}]}>
                    ¿Tienes dudas?
                  </Text>
                </View>
                <TouchableOpacity
                  style={buttonStyle}
                  onPress={()=>this.makeCall()}
                >
                  <Text style={textStyle}>
                      LLAMAME
                  </Text>
                </TouchableOpacity>
                <View style={generalcontent}>
                  <Text style={[styletext,{color:'red'}]}>
                    ¿Tienes una emergencia?
                  </Text>
                </View>
                <TouchableOpacity
                  style={[buttonStyle,{backgroundColor: 'red'}]}
                  onPress={()=>this.makeCallEmergency()}
                >
                  <Text style={textStyle}>
                      LLAMAR A CASETA
                  </Text>
                </TouchableOpacity>
              </View>
              
            </Itemx.Context>
        </Itemx.Canvas>
        
      );
    }

    
  }
}

const styles={
  textStyle:{
      
      alignSelf: 'center',
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
  },
  buttonStyle:{
   
      alignSelf:'stretch',
      backgroundColor: '#BF05A9',
      borderRadius: 25,
      borderWidth:0,
      marginLeft: 25,
      marginRight: 25
      
  },
  mainShow:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  faceAse:{ 
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  styletext:{
    color:'#0070C0', 
    fontWeight:'bold',
    fontSize:18,
    justifyContent:'center'
  },
  generalcontent:{
    flexDirection: 'row', 
    justifyContent:'center'
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notiCommunity
  }
}

export default connect(mapStateToProps)(alarm)
