import React, {Component} from 'react'
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import Splash from './../Splash'


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
            console.log('Suma=>',pagado,'Adeudo->',adeudo)
            this.setState({casa:res})
            this.setState({pagado:RestOp.formatCurrency(pagado)})
            this.setState({adeudo:RestOp.formatCurrency(adeudo)})
        })
        
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
            return(
                <Itemx.Canvas>
                    <Itemx.Header navigation={this.props.navigation} nameHeader={`${casax.residencia.calle} #${casax.residencia.numero}`} iconHeader="contacts" menuDirection='back' />
                    <Itemx.Context>
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
                                    <Text style={{color:'#3C763D',fontSize:22}}>{this.state.pagado}</Text>
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
                    </Itemx.Context>
                </Itemx.Canvas>
            )
        }
    }

}

export  {propiedad}