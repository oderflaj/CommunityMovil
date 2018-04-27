import React, {Component} from 'react'
import { View, Text, ScrollView, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import Splash from './../Splash'
import * as MisFun from './../functions/MiscFunctions';

class pagodetalle extends Component{
    constructor(props){
        super(props)

        
    }

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
        
        return pagodet.map(pd=>{
            if(pd.folio==null){
                pd.folio = 'N/A'
            }
            
            pd.closeddate = MisFun.formatDate(pd.closeddate)

            let periodo = `${pd.periodo}`
            let mes = periodo.substring(4,6)
            let anno = periodo.substring(0,4)
            let mesPago=`${MisFun.getMonthNameNumber(mes).toUpperCase()} ${anno}`
            
            return(
                <View key={pd.id} style={{marginBottom:5}}>
                    <View style={{
                        flexDirection:'row',
                        backgroundColor:'#BF05A9',
                        paddingLeft:10,
                        borderTopLeftRadius:12,
                        borderTopRightRadius:12,
                        paddingBottom:3,
                        paddingTop:3
                        }}>
                            <Text style={{color:'#fff'}}>{mesPago}</Text> 
                    </View>
                    <View style={{
                    borderColor:'#858585',
                    borderWidth:0.5,
                    //marginBottom: 10,
                    borderBottomRightRadius:8,
                    borderBottomLeftRadius:8
                    
                }}>
                    
                    <View style={{
                        flexDirection:'row',
                        borderColor:'#858585',
                        borderBottomWidth:0.5,
                        paddingLeft:5,
                        paddingBottom:3,
                        paddingTop:3
                    }}>
                        <Text style={{color:'#858585', fontWeight:'bold', marginRight: 10}}>{`Fecha de pago: ${pd.closeddate}`}</Text>
                    </View>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        paddingLeft:5
                    }}>
                        <Itemx.LabelValue labelx='Monto' valuex={`$${pd.feeamount}`} labelsize={12} valuesize={12} />
                        <Itemx.LabelValue labelx='Folio' valuex={pd.folio} labelsize={12} valuesize={12} />
                    </View>
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
                <Itemx.Header navigation={this.props.navigation} 
                                nameHeader='Mi Propiedad' 
                                iconHeader="contacts" 
                                menuDirection='back' 
                                menuItem='Propiedad'
                                menuItemParams= {{id:params.home.residencia.id}}
                                 />
                <Itemx.Context>
                    <ScrollView>
                    <Itemx.Marquee labelx={`${params.home.residencia.calle} #${params.home.residencia.numero}`} >
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        paddingBottom:5,
                                        paddingTop:5
                                    }}>
                                    <Text style={{color: '#0070C0'}}>MONTO PAGADO</Text>
                                    <Text style={{color: '#0070C0'}}>${params.home.pagado}</Text>
                            </View>
                        </Itemx.Marquee>
                        
                        {this.pagodet(params.home.pago)}
                    </ScrollView>
                </Itemx.Context>
            </Itemx.Canvas>
        );
    }
}

export  {pagodetalle}