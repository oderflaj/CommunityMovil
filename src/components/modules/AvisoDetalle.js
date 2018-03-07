import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView, AsyncStorage } from 'react-native';

import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import Splash from './../Splash'

class avisoDetalle extends Component {
  constructor(props){
    super(props);
    console.debug(props)
    this.state = {aviso:this.props.navigation.state.params.aviso, host:undefined,token:undefined};
  }

  async componentWillMount() {
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('usertoken');

    this.setState({host:_host,token:_token})
  }
  

  muestraAviso(aviso){
    
    console.debug("Aviso>>>>>> ",aviso)

    
    let url = `${this.state.host}/WebMovil/AvisoMensaje?usertoken=${this.state.token}&id=${aviso.id}`

    console.debug("URL Aviso-> ",url)
  //let mensaje = aviso.mensaje
  
    return (
      <WebView
          source={{uri: url}}
          style={{marginTop: 5}}
        />
    )
  }

  render() {
    const {navigation} = {...this.props}
    let aviso = this.state.aviso


    if(this.state.aviso==undefined || this.state.host==undefined || this.state.token==undefined)
    {
      return(<Splash/>)
    }
    else
    {

     return( <Itemx.Canvas>
        <Itemx.Header navigation={navigation} nameHeader="Detalle Aviso" iconHeader="" menuDirection='back' menuItem='Aviso' />
        <Itemx.Context>
        <Itemx.LabelValue labelx='ASUNTO:' valuex={aviso.asunto}  />
        <Itemx.LabelValue labelx='FECHA:' valuex={MisFun.formatDate(aviso.fecha)}  />
        <Text style={{fontWeight:'bold'}} >MENSAJE:</Text>
          {this.muestraAviso(aviso)}
        </Itemx.Context>
      </Itemx.Canvas>)
    } 
    
  }
  
}

const styles ={
  a: {
    fontWeight: '300',
    color: '#000', // make links coloured pink
  },
}

export {avisoDetalle}