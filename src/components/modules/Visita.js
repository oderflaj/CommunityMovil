import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
      
      const casas = () =>{
        return propiedades.map(casa=>{
            let iconColor = (casa.estado=='VIGENTE' ? '#3C763D' : '#A94442')
            let statusname = casa.novisitas==0 ? '' : 'success'
            let textshow   = casa.novisitas==0 ? 'BLOQUEO DESACTIVADO' : 'BLOQUEO ACTIVADO'
            let iconshow   = casa.novisitas==0 ? 'info' : 'done'


            return(<Itemx.DrillButton 
                    onPress={() =>this.props.navigation.navigate('VisitaDetalle',{propiedad:casa, header:true})}
                    iconIlust='home'
                    iconDrill='more-vert'
                    colorFont={iconColor}
                    key={casa.id}
                  >
                    <Text style={{marginBottom:2, color:'#5F5F5F'}}>{casa.calle} #{casa.numero}</Text>
                    <Itemx.StatusColor statusname={statusname} textshow={textshow} iconshow={iconshow} colorshow=''/>
                  </Itemx.DrillButton>)})
      }

      return (
          <View>
            <Itemx.LabelValue labelx='PROPIEDADES' valuex={`Seleccione la propiedad para consultar sus visitas.`} style={{marginBottom:10}} />
            {casas()}
          </View>
          
        )
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
          <ScrollView>
            {this.showGeneral(this.state.propiedades)}
          </ScrollView>
        </Itemx.Context>
      </Itemx.Canvas>
      
        
    );
  }
}

export {visita}