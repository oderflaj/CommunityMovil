import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import Splash from './../Splash'

class perfil extends Component {
  constructor(props){
    super(props)
    this.state ={usuario:undefined, propiedades:[]}
  }
  async componentWillMount(){

    await RestOp.getBase().then(r=>{
            this.setState({usuario:r.usuario})
            this.setState({propiedades:r.propiedades})
        })
  }

  propiedadesButton(propiedades){

    // return(<Itemx.DrillButton 
    //   onPress={()=>console.log('Imprime botonazo')}
    //   iconIlust='home'
    //   iconDrill='more-vert'
    //   colorFont='#74AC3A'
    //   >
    //     <Text>Ok 1</Text>
    //     <Itemx.StatusColor statusname='warning' textshow='VIGENTE' iconshow='done' colorshow=''/>
    //   </Itemx.DrillButton>
    //   );
    return propiedades.map(casa=>{
          if(casa.estado == 'VENCIDO')
          {
            return(<Itemx.DrillButton 
              onPress={()=>console.log('Imprime botonazo')}
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
              onPress={()=>console.log('Imprime botonazo')}
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
          <Itemx.Header navigation={navigate} nameHeader="Perfil" iconHeader="contacts"/>
          <Itemx.Context>
            <Itemx.LabelValue labelx='NOMBRE' valuex={fullname}  />
            <Itemx.LabelValue labelx='EMAIL' valuex={this.state.usuario.email} />
            <Itemx.LabelValue labelx='TELEFONO' valuex={this.state.usuario.celular} />
            <Itemx.LabelValue labelx='PROPIEDADES' valuex='' />
              {this.propiedadesButton(this.state.propiedades)}
          </Itemx.Context>
        </Itemx.Canvas>
        
      );
    }
    
    
  }
}

export {perfil}
