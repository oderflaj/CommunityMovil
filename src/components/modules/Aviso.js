import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

      let fechaAux = MisFun.formatDate(a.fecha)

      let fecha = fechaAux.split("/")
      let dia = fecha[0]
      let mes = fecha[1]
      let anno = fecha[2]
      
      let fechaAviso=`${dia} ${MisFun.getMonthNameNumber(mes).toUpperCase()} ${anno}`

      return (
        <TouchableOpacity key={a.id} style={{marginBottom:5}} onPress={() =>this.props.navigation.navigate('AvisoDetalle',{aviso:a})}>
          <View style={{
              flexDirection:'row',
              backgroundColor:'#BF05A9',
              paddingLeft:10,
              borderTopLeftRadius:12,
              borderTopRightRadius:12,
              paddingBottom:3,
              paddingTop:3
              }}>
                  <Text style={{color:'#fff'}}>{fechaAviso}</Text> 
          </View>
          <View style={{
                    borderColor:'#858585',
                    borderWidth:0.5,
                    //marginBottom: 10,
                    borderBottomRightRadius:8,
                    borderBottomLeftRadius:8
                    
                    }}>
                    <View style={{
                        //flex:1,
                        flexDirection:'row',
                        justifyContent:'space-between',
                    }}>
                        <View style={{ justifyContent:'center', paddingLeft:10}}>
                          <Text style={{fontSize:13,color:'#8F7F7F', fontWeight:"bold"}} numberOfLines={3}>{a.asunto}</Text>
                        </View>
                        <Icon color='#BF05A9' name='keyboard-arrow-right' size={35} />
                    </View>
                </View>
        </TouchableOpacity>
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