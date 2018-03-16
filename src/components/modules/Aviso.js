import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';

import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import Splash from './../Splash'

class aviso extends Component {
  constructor(props){
    super(props);
    this.state = {avisos:undefined};
  }

  async componentWillMount(){
    const {params} = this.props.navigation.state;
        await RestOp.getCommunity("avisos").then(res=>{
            console.log(res)
            this.setState({avisos:res})
        })
  }


  listaAvisos(){

    let avv = this.state.avisos
    
    if(avv.avisos == undefined || avv.avisos.length == 0 )
    return(
      <Text style={{marginBottom:2,color:'#5F5F5F', fontWeight:'bold', fontStyle:'italic' }}>No existen avisos publicados para la comunidad.</Text>
    )

    return avv.avisos.map(a=>{

      let mensaje = a.mensaje//`<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;

      return (
        <Itemx.DrillButton 
            onPress={() =>this.props.navigation.navigate('AvisoDetalle',{aviso:a})}
            iconIlust='message'
            iconDrill='more-vert'
            colorFont='#8A6D3B'
            key={a.id}
          >
            <Text style={{marginBottom:2,fontWeight:'bold'}}>{a.asunto}</Text>
            <Text style={{marginBottom:2,color:'#5F5F5F'}}>Publicado: {MisFun.formatDate(a.fecha)}</Text>
          </Itemx.DrillButton>
      )

    });
    
    
    
  }

  render() {
    let navigate = this.props.navigation;

    if(this.state.avisos==undefined)
    {
      return(<Splash/>)
    }
    else
    {

     return( <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Avisos" iconHeader="notifications-active"/>
        <Itemx.Context>
          <ScrollView>
            <Itemx.LabelValue labelx='LISTADO AVISOS' valuex='Seleccione uno de los avisos para ver a detalle la información.'  /> 
            {this.listaAvisos()}
          </ScrollView>
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

export {aviso}