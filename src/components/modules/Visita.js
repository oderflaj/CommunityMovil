import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import Splash from './../Splash'
import {VisitaDetalle} from './VisitaDetalle'

class visita extends Component {
  constructor(props){
    super(props);
    this.state ={usuario:undefined, condominio:undefined, propiedades:undefined, menuDirection:''}
  }

  async componentWillMount(){
    await RestOp.getBase().then(r=>{
      this.setState({usuario:r.usuario})
      this.setState({condominio:r.condominio})
      return r.usuario
    })
    .then(u=>{
      RestOp.getCommunity("infovisitabase",u.id).then(rr=>{
        this.setState({propiedades:rr.propiedades})
      })
    })
  }

  showGeneral(propiedades){
    
    if(propiedades.length == 0){
      return(<Itemx.LabelValue labelx='AVISO' valuex={`No cuentas con un domicilio configurado para notificación de visitas, si habitas un domicilio comunicate con el Administrador a traves del correo electrónico ${this.state.condominio.emailContacto} ó al teléfono ${this.state.condominio.telContacto} para que tu usuario sea configurado.`} /> )
    }
    else if(propiedades.length > 1){
      return (<VisitaDetalle propiedad={propiedades[0]} header={false}/>)
    }
    else{
      //this.setState({menuDirection:'back'})
      return (<VisitaDetalle propiedad={propiedades[0]} header={false}/>)
    }
  }

  render() {
    let navigate = this.props.navigation;

    if(this.state.propiedades==undefined)
    {
      return(<Splash/>)
    }


    return (
      <Itemx.Canvas>
        <Itemx.Header navigation={navigate} nameHeader="Visitas" iconHeader="wc" />
        <Itemx.Context>
          {this.showGeneral(this.state.propiedades)}
        </Itemx.Context>
      </Itemx.Canvas>
      
        
    );
  }
}

export {visita}