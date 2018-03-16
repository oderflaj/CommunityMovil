import React, {Component} from 'react'
import { View, Text, AsyncStorage, Switch, Alert,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import DatePicker from 'react-native-datepicker'
import Splash from './../Splash'

class VisitaDetalle extends Component{

    constructor(props){
        super(props);
        let fec = new Date();
        let mon = `${fec.getMonth()+1}`
        let day = `${fec.getDate()}`
        
        mon = (mon.length>1 ? mon : `0${mon}` )
        day = (day.length>1 ? day : `0${day}`)

        cuFec = `${fec.getFullYear()}-${mon}-${day}`

        let proper= undefined 
        let header = undefined
        
        if(this.props.navigation==undefined)
        {
            proper = this.props.propiedad
            header = this.props.header || false
        }
        else
        {
            proper = this.props.navigation.state.params.propiedad
            header = this.props.navigation.state.params.header || false
        }

        this.state = {load:true, propiedad:proper, visitas:undefined, date:cuFec, baseDate:cuFec, sw:false, ft:true, header:header};
    }

    async componentDidMount(){
        
        let fec = new Date();
        let mon = `${fec.getMonth()+1}`
        let day = `${fec.getDate()}`
        
        mon = (mon.length>1 ? mon : `0${mon}` )
        day = (day.length>1 ? day : `0${day}`)

        cuFec = `${fec.getFullYear()}-${mon}-${day}`
        console.debug(`${this.state.propiedad.id}/${cuFec}`)
        await RestOp.getCommunity("visitas",`${this.state.propiedad.id}/${cuFec}`).then(rr=>{
            //console.log('componentDidMount',`${this.state.propiedad.id}/${cuFec}`,'-->>',rr.visitas)
            this.setState({visitas:rr.visitas})
            this.setState({load:false})
            this.setState({sw:(this.props.navigation.state.params.propiedad.novisitas == 0 ? false :(this.props.navigation.state.params.propiedad.novisitas == undefined ? false : true))})
          })
        
        // console.debug("Se esta cargando la información->",this.state.sw)

        
    }

    async redDrawList(){
        this.setState({load:true}) 
        
        await RestOp.getCommunity("visitas",`${this.state.propiedad.id}/${this.state.date}`).then(rr=>{
            // console.log(rr.visitas)
            this.setState({visitas:rr.visitas})
            this.setState({load:false})
            this.setState({sw:(this.props.navigation.state.params.propiedad.novisitas == 0 ? false :(this.props.navigation.state.params.propiedad.novisitas == undefined ? false : true))})
          })

        
    }

    drawList(id){
        
        if(this.state.load){
            return(
                <View style={{marginTop:40}}>
                    <Itemx.Spinner />
                </View>
            )
        }

        if(this.state.visitas==undefined || this.state.visitas.length==0){
            //console.debug(this.state.visitas)
            return(
                <View style={{paddingLeft:5}}>
                    <Text style={{fontSize:12, paddingTop:5}}>NO EXISTEN VISITAS PARA LA FECHA SELECCIONADA</Text>
                </View>
            )
        }
        else{
            let vs = this.state.visitas

            
            vs.sort((a,b)=>{
                return a.id > b.id ? 1 : (b.id > a.id ? -1 : 0)
            }).reverse()

            
            return vs.map(v=>{

                const deta =()=>{
                    if(v.observacion.length>0){
                        return (<Text style={{color:'#000'}}>{v.detalle1} <Text style={{fontWeight:'bold'}}>OBSERVACION:</Text>{v.observacion}</Text>)
                    }
                    return(
                        <Text style={{color:'#000'}}>{v.detalle1}</Text>
                    )
                };

                return (<View key={v.id} style={{
                    flexDirection:'row',
                    paddingLeft:3,
                    borderBottomColor:'#858585',
                    borderBottomWidth:1
                    }}>
                        <View style={{width:'20%', justifyContent:'center',flexDirection:'row'}}>
                            <View style={{justifyContent:'center'}}>
                                <Text style={{color:'#000'}}>{v.horaEntrada}</Text>
                            </View>
                        </View>
                        <View style={{width:'80%', justifyContent: 'flex-start', flexDirection:'row'}}>
                            {deta()}
                        </View>
                </View>)
            })                                                        
        }
    }

    drawview(){
        
        let propiedad = this.state.propiedad
        let sta =  (propiedad.estado == 'VIGENTE' ? 'success' : 'danger')
        let icosta =  (propiedad.estado == 'VIGENTE' ? 'done' : 'close')
        let swVal = this.state.sw

        const iconStatus = ()=>{
            

            if(swVal)
            { 
                if(!this.state.ft)
                {   
                    Alert.alert(
                        'CONFIRMACION',
                        '¿Desea BLOQUEAR las visitas a su domicilio?',
                        [
                        
                        {text: 'ACEPTAR', onPress: () => {
                            try{
                                RestOp.getCommunity("updateVisitas",`${this.state.propiedad.id}/on`,'put').then(rr=>{
                                    console.debug("Activo bloqueo de visitas")
                                  })
                            }
                            catch(error){
                                Alert.alert(
                                    'Error',
                                    `Se presento un problema en el proceso de Bloqueo de visitas, asegurese de tener conexion de internet.\n ${error}\nSi el problema persiste reportelo a Tecstrag.`
                                    [
                                      {text: 'OK', onPress: () => console.debug('OK Pressed')}
                                    ],
                                    { cancelable: false }
                                  )
                            }
                            console.debug('SI-> BLOQUEO las visitas')

                        }},
                        {text: 'CANCELAR', onPress: () => {
                            console.debug('No BLOQUEO las visitas')
                            this.setState({sw:false})
                            },  style: 'cancel'},
                        ],
                        { cancelable: false }
                    )
                }
                return(
                    <Itemx.StatusColor statusname='success' textshow='ACTIVADO' iconshow='done'  />
                )
            }
            else{

                try{
                    if(!this.state.ft)
                    {
                        RestOp.getCommunity("updateVisitas",`${this.state.propiedad.id}/off`,'put').then(rr=>{
                            console.debug("Cancelo bloqueo de visitas")
                          })    
                    }
                    
                }
                catch(error){
                    Alert.alert(
                        'Error',
                        `Se presento un problema en el proceso de Bloqueo de visitas, asegurese de tener conexion de internet.\n ${error}\nSi el problema persiste reportelo a Tecstrag.`
                        [
                          {text: 'OK', onPress: () => console.debug('OK Pressed')}
                        ],
                        { cancelable: false }
                      )
                }

                return(
                    <Itemx.StatusColor statusname='warning' textshow='DESACTIVADO' iconshow='info'  />
                )
            }
            
        }

        return(
            <View>
                <Itemx.LabelValueColor iconshow='home' statusname={sta} textlabel={`${propiedad.calle} #${propiedad.numero}`} />
                <View style={{flex:1, flexDirection:'row', paddingTop:20, justifyContent: 'space-between'}}>
                    <View style={{justifyContent:'center', paddingLeft:5, width:'50%'}}>
                        <Text style={{fontWeight:'bold'}}>BLOQUEO DE VISITAS</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'flex-start'}}>
                        <Switch
                            value={this.state.sw}
                            onValueChange={(val) => {console.debug("Switch->",val), this.setState({sw:val,ft:false})}}
                            disabled={false}
                        />
                        <View style={{justifyContent:'center'}}>
                            {iconStatus()}
                        </View>
                    </View>
                    
                </View>
                    
                <View style={{flex:1, flexDirection:'row', paddingTop:20, justifyContent: 'space-between'}}>
                    <View style={{justifyContent:'center',paddingLeft:5, width:'50%'}}>
                        <Text style={{fontWeight:'bold'}}>FECHA VISITA</Text>
                    </View>
                        
                    <DatePicker
                            showIcon={false}
                            style={{width: 150, height: 40}}
                            date={this.state.date}
                            mode="date"
                            placeholder={`Fecha actual ${this.state.baseDate}`}
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate={this.state.baseDate}
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            customStyles={{
                            
                            // dateIcon: {
                            //     position: 'absolute',
                            //     left: 0,
                            //     top: 4,
                            //     marginLeft: 0
                            // },
                            // dateInput: {
                            //     marginLeft: 36
                            // }
                            // ... You can check the source to find the other keys. 
                            }}
                            onDateChange={(date) => {
                                this.setState({ft:true})
                                this.setState({date: date})
                                console.log(this.state.date)
                                this.redDrawList();
                            }}
                        />
                </View>
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#858585',
                    paddingLeft:5,
                    marginTop:20
                    }}>
                        <View style={{width:'20%', justifyContent:'center',flexDirection:'row'}}>
                            <Text style={{color:'#fff'}}>HORA</Text>
                        </View>
                        <View style={{width:'80%', justifyContent:'center', flexDirection:'row'}}>
                            <Text style={{color:'#fff'}}>DETALLE</Text>
                        </View>
                </View>
                
                {this.drawList(propiedad.id)}
            </View>
            
        )
    }

    render(){
        
        const {navigation} = {...this.props}
        //const {header, propiedad} ={...navigation.state.params}
        
        if(!this.state.header){
            return(
                <View>
                    {this.drawview()}
                </View>
            )
        }else{
            if(this.state.propiedad==undefined)
            {
                return(<Splash/>)
            }
            
            return(
                <Itemx.Canvas>
                    <Itemx.Header navigation={navigation} nameHeader="Detalle Visitas" iconHeader="wc" menuDirection='back' menuItem='Visita' />
                    <Itemx.Context>
                        <ScrollView>
                            {this.drawview()}
                        </ScrollView>
                    </Itemx.Context>
                </Itemx.Canvas>
            )
        }
        
    }
}

export {VisitaDetalle}