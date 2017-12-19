import React, {Component} from 'react'
import { View, Text, Button } from 'react-native';
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
            console.log('Sumax=>',MisFun.formatCurrency(pagado),'Adeudo->',adeudo)
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
            return(
                <Itemx.Canvas>
                    <Itemx.Header navigation={this.props.navigation} nameHeader={`${casax.residencia.calle} #${casax.residencia.numero}`} iconHeader="contacts" menuDirection='back' />
                    <Itemx.Context>
                    <View style={{
                            //flex:1,
                            flexDirection:'row',
                            backgroundColor:'#D9EDF7',
                            //borderRadius: 25,
                            borderColor:'#BCE8F1',
                            borderWidth:1,
                            paddingBottom: 1,
                            paddingTop: 1,
                            paddingLeft:10,
                            paddingRight:3,
                            height:60
                        }}>
                            <View style={{alignSelf:'center'}}>
                                <Icon color='#31708F' name='home' size={30} /> 
                            </View>
                            <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                                <View style={{alignSelf:'center'}}>
                                    <Text style={{
                                        color:'#31708F',
                                        fontWeight:'bold',
                                        fontSize:22
                                    }}>
                                        ESTATUS
                                    </Text>
                                </View>
                                <View style={{alignSelf:'center'}}>
                                    {this.returnStatus(casax.residencia.estado)}
                                    
                                </View>
                            </View>
                            
                        </View>

                        <View style={{
                            //flex:1,
                            flexDirection:'row',
                            backgroundColor:'#DFF0D8',
                            //borderRadius: 25,
                            borderColor:'#D6E9C6',
                            borderWidth:1,
                            paddingBottom: 1,
                            paddingTop: 1,
                            paddingLeft:10,
                            paddingRight:3,
                            height:60
                        }}>
                            <View style={{alignSelf:'center'}}>
                                <Icon color='#3C763D' name='check-circle' size={30} /> 
                            </View>
                            <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                                <View style={{alignSelf:'center'}}>
                                    <Text style={{
                                        color:'#3C763D',
                                        fontWeight:'bold',
                                        fontSize:22
                                    }}>
                                        PAGADO
                                    </Text>
                                </View>
                                <View style={{alignSelf:'center'}}>
                                    <Text style={{color:'#3C763D',fontSize:22}}>${this.state.pagado}</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{
                            //flex:1,
                            flexDirection:'row',
                            backgroundColor:'#F2DEDE',
                            //borderRadius: 25,
                            borderColor:'#EBCCD1',
                            borderWidth:1,
                            paddingBottom: 1,
                            paddingTop: 1,
                            paddingLeft:10,
                            paddingRight:3,
                            height:60
                        }}>
                            <View style={{alignSelf:'center'}}>
                                <Icon color='#A94442' name='cancel' size={30} /> 
                            </View>
                            
                            <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                                <View style={{alignSelf:'center'}}>
                                    <Text style={{
                                        color:'#A94442',
                                        fontWeight: 'bold',
                                        fontSize:22
                                    }}>
                                        ADEUDO
                                    </Text>
                                </View>
                                <View style={{alignSelf:'center'}}>
                                    <Text style={{color:'#A94442',fontSize:22}}>${this.state.adeudo}</Text>
                                </View>
                            </View>
                        </View>
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