import React, {Component} from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native';
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
                <Text style={{fontSize:13}}>NO TIENE PAGOS PENDIENTES</Text>
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
                paddingLeft:5
                }}
                key={ad.id}>
                    <View style={{width:'50%'}}>
                        <Text >{ad.periodo}</Text>
                    </View>
                    <View style={{width:'50%'}}>
                        <Text >${ad.balance}</Text>
                    </View>
            </View>)
        })
        return(
            <View style={{paddingLeft:5}}>
                <Text style={{fontSize:13}}>NO TIENE PAGOS PENDIENTES</Text>
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
                    <Itemx.Header navigation={this.props.navigation} nameHeader={`${casax.residencia.calle} #${casax.residencia.numero}`} iconHeader="contacts" menuDirection='back' menuItem='Perfil' />
                    <Itemx.Context>
                        <Itemx.LabelValueColor statusname='info' textlabel='ESTATUS' itemValue={true} iconshow='home' >
                            {this.returnStatus(casax.residencia.estado)}
                        </Itemx.LabelValueColor>
                        {/* <Itemx.LabelValueColor statusname='success' textlabel='PAGADO' textvalue={ `$${this.state.pagado}`} iconshow='check-circle' /> */}
                        <Itemx.LabelValueColor statusname='danger' textlabel='ADEUDO' textvalue={ `$${this.state.adeudo}`} iconshow='cancel' />
                        
                        
                        <View style={styles.rowdetail}>
                            <View style={styles.coldetail}> 
                                <Itemx.LabelValue labelx='ULT. PAGO' valuex={casax.residencia.ultPago} />
                            </View>
                            <View style={styles.coldetail}>
                                <Itemx.LabelValue labelx='ULT. PERIODO' valuex={casax.residencia.ultPeriodo} />
                            </View>
                        </View>
                        <View style={styles.rowdetail}>
                            <View style={styles.coldetail}> 
                                <Itemx.LabelValue labelx='ESCRITURACION' valuex={casax.residencia.escrituracion}/>
                            </View>
                            <View style={styles.coldetail}>
                                <Itemx.LabelValue labelx='REFERENCIA' valuex={casax.residencia.referencia} />
                            </View>
                        </View>
                        
                        
                        <View style={{
                            flexDirection:'row',
                            marginTop:20,
                            //borderColor:'#858585',
                            //borderBottomWidth:10
                            }}>
                                <Text style={{fontWeight:'bold'}}>PAGOS PENDIENTES</Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            backgroundColor:'#858585',
                            paddingLeft:5
                            }}>
                                <View style={{width:'50%'}}>
                                    <Text style={{color:'#fff'}}>PERIODO</Text>
                                </View>
                                <View style={{width:'50%'}}>
                                    <Text style={{color:'#fff'}}>MONTO</Text>
                                </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            {this.pagosPendientes(adeudo)}
                        </View>
                        <View style={{marginTop:20}}>
                            <Itemx.DrillButton 
                                onPress={() =>this.feeDetail(home)}
                                iconIlust='receipt'
                                iconDrill='more-vert'
                                colorFont='#2979FF'
                                style={{justifyContent: 'center'}}
                                >
                                <View style={{
                                    flex:1,
                                    flexDirection:'column',
                                    marginBottom:2,
                                    alignSelf:'center',
                                    justifyContent:'center',
                                    alignContent:'center',
                                }}>
                                    <Text style={{
                                        color:'#2979FF',
                                        fontWeight:'bold'
                                        }}>
                                        DETALLE PAGOS REALIZADOS
                                    </Text>
                                </View>
                            </Itemx.DrillButton>
                        </View>
                        
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