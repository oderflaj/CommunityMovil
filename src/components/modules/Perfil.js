import React, { Component } from 'react';
import { View, Text, Alert, AsyncStorage, TouchableWithoutFeedback,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
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
          if(casa.estado == 'VENCIDO')
          {
            return(<Itemx.DrillButton 
              onPress={() =>this.props.navigation.navigate('Propiedad',{id:casa.id})}
              iconIlust='home'
              iconDrill='more-vert'
              colorFont='#A94442'
              key={casa.id}
            >
              <Text style={{marginBottom:2}}>{casa.calle} #{casa.numero}</Text>
              <Itemx.StatusColor statusname='danger' textshow={casa.estado} iconshow='close' colorshow=''/>
            </Itemx.DrillButton>)
          }
          else
          {
            return(<Itemx.DrillButton 
              onPress={() =>this.props.navigation.navigate('Propiedad',{id:casa.id})}
              iconIlust='home'
              iconDrill='more-vert'
              colorFont='#3C763D'
              key={casa.id}
            >
              <Text style={{ marginBottom:2}}>{casa.calle} #{casa.numero}</Text>
              <Itemx.StatusColor statusname='success' textshow={casa.estado} iconshow='done' colorshow=''/>
            </Itemx.DrillButton>)
          }
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
              <Itemx.LabelValue labelx='NOMBRE' valuex={fullname}  />
              <Itemx.LabelValue labelx='EMAIL' valuex={this.state.usuario.email} />
              <Itemx.LabelValue labelx='TELEFONO' valuex={this.state.usuario.celular} />
              <Itemx.LabelValue labelx='PROPIEDADES' valuex='' />
                {this.propiedadesButton(this.state.propiedades)}
              
              <View style={{flexDirection:'column', justifyContent:'flex-end', flex:1 }}>
                <View style={{ 
                  borderColor:'#2979FF', 
                  borderWidth:1, 
                  borderRadius:50, 
                  alignContent:'center',
                  justifyContent:'center',
                  padding:5,
                  maxWidth:180,
                  alignSelf:'center',
                  marginBottom:10,
                  marginTop:10
                  }}>
                  <TouchableWithoutFeedback onPress={this.resetUser.bind(this)}>
                    <View style={{flexDirection:'row', }}>
                      <View>
                      <Icon color='#2979FF' name='sync-disabled' size={16} />
                      </View>
                      <View >
                        <Text style={{color:'#2979FF', fontSize:14}}>DESVINCULAR CUENTA</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </ScrollView>
          </Itemx.Context>
        </Itemx.Canvas>
        
      );
    }
    
    
  }
}

export {perfil}
