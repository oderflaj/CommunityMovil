import React, { Component } from 'react';
import { View, Text,WebView,AsyncStorage } from 'react-native';

import * as Itemx from './../items/IndexItem'
import Splash from './../Splash'

class edoCuentaDetalle extends Component {

  constructor(props){
    super(props);
    console.debug(props)
    this.state = {periodo:this.props.navigation.state.params.periodo, host:undefined,token:undefined};
  }

  async componentWillMount() {
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('usertoken');

    this.setState({host:_host,token:_token})
    console.debug("Periodo",`${this.state.host}/WebMovil/Edoctacondominio?usertoken=${this.state.token}&periodo=${this.state.periodo}`)
  }

  render() {
    let navigate = this.props.navigation;

    if(this.state.periodo==undefined)
    {
      return(<Splash/>)
    }
    else
    {
      return (
        
        <Itemx.Canvas>
          <Itemx.Header navigation={navigate} nameHeader="Detalle Edo Cta" iconHeader="" menuDirection='back' menuItem='EdoCuenta' />
          <Itemx.Context>
            <WebView
              source={{uri: `${this.state.host}/WebMovil/Edoctacondominio?usertoken=${this.state.token}&periodo=${this.state.periodo}`}}
              style={{marginTop: 10}}
              javaScriptEnabled={true}
            />
          </Itemx.Context>
        </Itemx.Canvas>
        
      );
    }
  }
}

export {edoCuentaDetalle}