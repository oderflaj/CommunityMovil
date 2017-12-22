import React, {Component} from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import Splash from './../Splash'

class pagodetalle extends Component{


    pagodet(pagodet){
        if(pagodet ==undefined || pagodet.lenght == 0){
            return(
                <View style={{paddingLeft:5, marginTop:5}}>
                    <Text style={{ color:'red'}}>NO EXISTEN PAGOS REGISTRADOS</Text>
                </View>
            )
        }
        console.log("Se siguio----------------------------")
        return(
            <View style={{paddingLeft:5, marginTop:5}}>
                <Text style={{ color:'red'}}>NO EXISTEN PAGOS REGISTRADOS</Text>
            </View>
        )

    }

    render(){
        const {params} = this.props.navigation.state;

        if(params==undefined)
        {
            return(<Splash/>)
        }

        return(
            <Itemx.Canvas>
                <Itemx.Header navigation={this.props.navigation} nameHeader={`${params.home.residencia.calle} #${params.home.residencia.numero}`} iconHeader="contacts" menuDirection='back' />
                <Itemx.Context>
                    <Itemx.LabelValueColor statusname='warning' textlabel='MONTO PAGADO' textvalue={`$${params.home.pagado}`} iconshow='monetization-on' textsize={18} />
                    <View style={{backgroundColor:'#858585', paddingLeft:5, marginTop:20}}>
                        <Text style={{fontWeight:'bold', color:'#fff'}}>DETALLE  DE  PAGOS</Text>
                    </View>
                    {this.pagodet(params.pagodet)}
                </Itemx.Context>
            </Itemx.Canvas>
        );
    }
}

export  {pagodetalle}