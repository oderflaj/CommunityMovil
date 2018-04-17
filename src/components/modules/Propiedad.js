import React, {Component} from 'react'
import { View, Text, Button, TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import Splash from './../Splash'
import NumberFormat from 'react-number-format';


class propiedad extends Component{
    constructor(props){
        super(props);
        this.state = {casa:undefined, pagado:undefined, adeudo:undefined};
    }

    async componentWillMount(){
        const {params} = this.props.navigation.state;
        await RestOp.getCommunity("infopropiedad",params.id).then(res=>{
            
            let pagado = 0
            let adeudo = 0
            res.pago.forEach(p => {
                if(p.estatus=='cerrado'){
                    pagado+=p.feeamount 
                }else{
                    adeudo+= Math.abs(p.balance)
                }
            });
            //console.log('Sumax=>',MisFun.formatCurrency(pagado),'Adeudo->',adeudo)
            this.setState({casa:res})
            this.setState({pagado:MisFun.formatCurrency(pagado)})
            this.setState({adeudo:MisFun.formatCurrency(adeudo)})
        })
        
    }

    returnStatus(estatus){
        if(estatus =='VENCIDO'){
            return(<Itemx.StatusColor statusname='danger' textshow={estatus} iconshow='close' colorshow='' iconsize={18} textsize={14} heightstatus={25}/>)
        }else{
            return(<Itemx.StatusColor statusname='success' textshow={estatus} iconshow='done' colorshow='' iconsize={18} textsize={14} heightstatus={25}/>)
        }
    }

    feeDetail(home){
        this.props.navigation.navigate('PagoDetalle',{home})
    }

    pagosPendientes(adeudo){
        
        if(adeudo==undefined || adeudo.length  == 0){
            return(
            <View style={{paddingLeft:5}}>
                <Text style={{fontSize:13,color:'#8F7F7F'}}>NO TIENE PAGOS PENDIENTES</Text>
            </View>
            );
        }
        return adeudo.map(ad=>{
            ad.balance = MisFun.formatCurrency(Math.abs(ad.balance));
            return (
            <View style={{
                flexDirection:'row',
                borderBottomColor:'#858585',
                borderBottomWidth:1,
                paddingTop:2,
                paddingBottom:1,
                paddingLeft:10
                }}
                key={ad.id}>
                    <View style={{width:'50%'}}>
                        <Text style={{fontSize:13,color:'#8F7F7F'}}>{ad.periodo}</Text>
                    </View>
                    <View style={{width:'50%'}}>
                        <Text style={{fontSize:13,color:'#8F7F7F'}}>${ad.balance}</Text>
                    </View>
            </View>)
        })
        return(
            <View style={{paddingLeft:5}}>
                <Text style={{fontSize:13,color:'#8F7F7F'}}>NO TIENE PAGOS PENDIENTES</Text>
            </View>
            );
    }


    render(){
        const {params} = this.props.navigation.state;
        //console.log('ID->',params.id)
        let casax = this.state.casa
        if(casax==undefined)
        {
            return(<Splash/>)
        }
        else
        {
            casax.residencia.ultPago = MisFun.formatDate(casax.residencia.ultPago)
            casax.residencia.escrituracion = MisFun.formatDate(casax.residencia.escrituracion)
            let pagado = casax.pago.filter(f=>{if(f.estatus == 'cerrado') return f})
            let adeudo = casax.pago.filter(f=>{if(f.estatus == 'activo') return f})

            let home ={residencia:casax.residencia, pagado:this.state.pagado, adeudo:this.state.adeudo, pago:pagado, id:casax.residencia.id }
            // console.log(pagado)
            // console.log(adeudo)

            return(
                <Itemx.Canvas>
                    <Itemx.Header navigation={this.props.navigation} nameHeader='Mi Propiedad' iconHeader="contacts" menuDirection='back' menuItem='Perfil' />
                    <Itemx.Context>
                        <ScrollView>
                        <Itemx.Marquee labelx={`${casax.residencia.calle} #${casax.residencia.numero}`} >
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        paddingBottom:5,
                                        paddingTop:5
                                    }}>
                                    <Text style={{color: '#0070C0'}}>ADEUDO</Text>
                                    <Text style={{color: '#0070C0'}}>${this.state.adeudo}</Text>
                            </View>
                        </Itemx.Marquee>
                        
                        <Itemx.Marquee labelx={`INFORMACION`} >
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                    <View>
                                        <Itemx.LabelValue labelx='ULT.PAGO' valuex={casax.residencia.ultPago}/>
                                    </View>
                                    <View>
                                        <Itemx.LabelValue labelx='MES CUBIERTO' valuex={casax.residencia.ultPeriodo}/>
                                    </View>
                            </View>
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                    <View>
                                        <Itemx.LabelValue labelx='ESCRITURACION' valuex={casax.residencia.escrituracion}/>
                                    </View>
                                    <View>
                                        <Itemx.LabelValue labelx='REFERENCIA' valuex={casax.residencia.referencia}/>
                                    </View>
                            </View>
                        </Itemx.Marquee>

                            
                            
                            
                            <View style={{flex:1, flexDirection:'row', justifyContent:'center',paddingTop:15}}>
                                <Itemx.LabelValue labelx='PAGOS PENDIENTES' valuex='' />  
                            </View>
                            <View style={{
                                flexDirection:'row',
                                backgroundColor:'#BF05A9',
                                paddingLeft:10,
                                borderTopLeftRadius:12,
                                borderTopRightRadius:12,
                                paddingBottom:3,
                                paddingTop:3
                                }}>
                                    <View style={{width:'50%'}}>
                                        <Text style={{color:'#fff'}}>PERIODO</Text>
                                    </View>
                                    <View style={{width:'50%'}}>
                                        <Text style={{color:'#fff'}}>MONTO</Text>
                                    </View>
                            </View>
                            <View style={{marginBottom:15}}>
                                {this.pagosPendientes(adeudo)}
                            </View>

                            <Itemx.TransparentButton onPress={() =>this.feeDetail(home)} icon='receipt' text='DETALLE PAGOS REALIZADOS'/>
                            
                        </ScrollView>
                    </Itemx.Context>
                </Itemx.Canvas>
            )
        }
    }

}

const styles ={
    rowdetail:{
        //flex:1,
        flexDirection:'row',
        //backgroundColor:'#F2DEDE',
        //borderRadius: 25,
        borderColor:'#858585',
        borderTopWidth:0,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        paddingBottom: 1,
        paddingTop: 8,
        paddingLeft:10,
        paddingRight:3,
        height:60
    },
    coldetail:{
        width:'50%',
        paddingLeft:10,
    }
}

export  {propiedad}