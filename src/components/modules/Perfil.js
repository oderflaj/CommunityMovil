import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, TouchableWithoutFeedback,ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import Splash from './../Splash'

class perfil extends Component {
  constructor(props){
    super(props)
    this.state ={usuario:undefined, propiedades:[],host:undefined,token:undefined}
  }
  async componentWillMount(){

    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('usertoken');

    this.setState({host:_host,token:_token})

    await RestOp.getBase().then(r=>{
            this.setState({usuario:r.usuario})
            this.setState({propiedades:r.propiedades})
        })
  }

  resetUser(){
    Alert.alert(
      'CONFIRMACION',
      '¿Desea desvincular su usuario de Community?',
      [
        
        {text: 'ACEPTAR', onPress: () =>{
          

          
          console.debug('Tengo->',this.state.token)
          RestOp.getCommunity("desvincular",this.state.token).then(res=>{
                        
          console.debug(res);
          AsyncStorage.removeItem('host')
          AsyncStorage.removeItem('usuario')
          AsyncStorage.removeItem('password')
          AsyncStorage.removeItem('token')
          AsyncStorage.removeItem('usertoken')
        })


          this.props.navigation.navigate('Login')
        }},
        {text: 'CANCELAR', onPress: () => console.log('Cancelo desvincular usuario'),  style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  propiedadesButton(propiedades){

    return propiedades.map(casa=>{
      const statusname=(casa.estado=='VENCIDO'?'danger':'success')
      const icon = (casa.estado=='VENCIDO'?'highlight-off':'check-circle')
      const conteninfo ={
        flexDirection: 'row',
        justifyContent: 'space-around'
      }
      let adeudo = MisFun.formatCurrency(Math.abs(casa.adeudo));
      return(
      <TouchableOpacity 
        key={casa.id}
        onPress={() =>this.props.navigation.navigate('Propiedad',{id:casa.id})}
      >
        <Itemx.Marquee labelx={`${casa.calle} #${casa.numero}`} >
          <View style={conteninfo}>
            <View style={{ justifyContent:'center'}}>
              <Itemx.StatusColor statusname={statusname} textshow={casa.estado} iconshow={icon} colorshow=''/>
            </View>
            <View style={{ justifyContent:'center'}}>
            <Text style={{color: '#0070C0'}}>${adeudo}</Text>
            </View>
            <Icon color='#BF05A9' name='keyboard-arrow-right' size={35} />
          </View>
          
        </Itemx.Marquee>
      </TouchableOpacity>
          )

         
        }
      )
  }

  render() {
    let navigate = this.props.navigation;
    
    if(this.state.usuario==undefined)
    {
      return(<Splash/>)
    }
    else
    {
      let fullname = this.state.usuario.nombre + ' ' + this.state.usuario.apepaterno + ' ' + this.state.usuario.apematerno
      return (
        <Itemx.Canvas>
          <Itemx.Header navigation={navigate} nameHeader="Perfil" iconHeader="contacts" />
          <Itemx.Context>
            <ScrollView>
              <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Icon color='#BF05A9' name='account-box' size={100} />
                <View style={{flexWrap:'wrap'}}>
                  <Itemx.LabelValue labelx='NOMBRE' valuex=''  >
                    <Text style={{color:'#0070C0'}}>{this.state.usuario.nombre}</Text>
                    <Text style={{color:'#0070C0'}}>{this.state.usuario.apepaterno}</Text>
                    <Text style={{color:'#0070C0'}}>{this.state.usuario.apematerno}</Text>
                  </Itemx.LabelValue>
                  <Itemx.LabelValue labelx='EMAIL' valuex={this.state.usuario.email} />
                  <Itemx.LabelValue labelx='TELEFONO' valuex={this.state.usuario.celular||'No Registrado'} />
                </View>
              </View>
              
              
              <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Itemx.LabelValue labelx='MIS PROPIEDADES' valuex='' />  
              </View>
              <View style={{paddingLeft:10, paddingRight:10}}>
                {this.propiedadesButton(this.state.propiedades)}
              </View>
              
              <Itemx.TransparentButton onPress={this.resetUser.bind(this)} icon='sync-disabled' text='DESVINCULAR CUENTA'/>
              
            </ScrollView>
          </Itemx.Context>
        </Itemx.Canvas>
        
      );
    }
    
    
  }
}

export {perfil}
