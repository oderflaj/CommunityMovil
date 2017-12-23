import React, {Component} from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import Splash from './../Splash'
import * as MisFun from './../functions/MiscFunctions';

class pagodetalle extends Component{


    pagodet(pagodet){
        if(pagodet ==undefined || pagodet.lenght == 0){
            return(
                <View style={{paddingLeft:5, marginTop:5}}>
                    <Text style={{ color:'red'}}>NO EXISTEN PAGOS REGISTRADOS</Text>
                </View>
            )
        }
        pagodet.sort((a,b)=>{
            return a.periodo > b.periodo ? 1 : (b.periodo > a.periodo ? -1 : 0)
        }).reverse()
        console.log("Se siguio----------------------------")
        return pagodet.map(pd=>{
            if(pd.folio==null){
                pd.folio = 'N/A'
            }
            
            pd.closeddate = MisFun.formatDate(pd.closeddate)

            return(
                <View key={pd.id} style={{
                    borderColor:'#858585',
                    borderBottomWidth:1,
                    borderLeftWidth:1,
                    borderRightWidth:1,
                    padding:5,
                }}>
                    <View style={{
                        flexDirection:'row',
                        borderColor:'#858585',
                        borderBottomWidth:0.5,
                        paddingBottom:3
                    }}>
                        <Text style={{fontSize:15, fontWeight:'bold', marginRight: 10}}>FOLIO:</Text>
                        <Text style={{fontSize:15, marginRight: 10}}>{pd.folio}</Text>
                    </View>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        paddingTop:5
                    }}>
                        <Itemx.LabelValue labelx='PERIODO' valuex={pd.periodo} labelsize={12} valuesize={12} />
                        <Itemx.LabelValue labelx='FECHA PAGO' valuex={pd.closeddate} labelsize={12} valuesize={12} />
                        <Itemx.LabelValue labelx='MONTO' valuex={`$${pd.feeamount}`} labelsize={12} valuesize={12} />
                    </View>
                </View>
            )
        })

    }

    render(){
        const {params} = this.props.navigation.state;
        console.log(params.home)
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
                        <Text style={{fontWeight:'bold', color:'#fff', fontSize:16}}>DETALLE  DE  PAGOS</Text>
                    </View>
                    {this.pagodet(params.home.pago)}
                </Itemx.Context>
            </Itemx.Canvas>
        );
    }
}

export  {pagodetalle}