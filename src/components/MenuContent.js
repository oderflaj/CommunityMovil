import React, { Component } from 'react';
import { View,Text,StyleSheet, Button, Image, TouchableHighlight, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import {DrawerNavigator} from 'react-navigation'
import {MenuItem} from './items/MenuItem'
import * as RestOp from './functions/RestFunctions';
import {connect} from 'react-redux'

class MenuContent extends Component{
    constructor(props){
        super(props)
        console.debug("En menu Context",props)
        this.state = {infobase:undefined, condominio:'', email:'', nombre:''}
        //Gets the base information in asychronous mode and then save the object, then save the data into variables
        RestOp.getBase().then(r=>{
            
            console.debug("MenuContext r.condominio.nombre->",r.condominio.nombre)

            console.debug("MenuContext r->",r)
            
            this.setState({infobase:r})
        })
        .then(()=>{

            x =  this.state.infobase
            
            this.setState({condominio:x.condominio.nombre})
            this.setState({email:x.usuario.email})
            this.setState({nombre: x.usuario.nombre + " " + x.usuario.apepaterno })
        })
    }

    componentWillMount = () => {
        // console.debug("En la notificacion",this.props)
        // if(this.props.notification.modulo !== "Alarm"){
        //     this.props.navigation.navigate(this.props.notification.modulo,this.props.notification.objeto)
        // }

    }
    

  
    render(){
        const {navigate} = this.props.navigation;
        let x =  this.state.infobase
        //console.log("Se actualiza 2")
        return(
            <View style={{borderTopColor:"#000", borderTopWidth:24, backgroundColor: "#BF05A9", height:"100%"} }>       
                <View style={styles.menuHeader}>                    
                    <Image
                        style={styles.imgLogo}
                        source={require('./../image/tgslogoC.png')}
                    />
                    <Text style={styles.infoCondo} >{this.state.condominio}</Text>
                    {/* <Text style={styles.infoUser} >{this.state.email}</Text> */}
                    <Text style={styles.infoUser} >{this.state.nombre}</Text>
                </View>
                <View style={styles.backgroundContent}>
                    <MenuItem onPressItem={()=>navigate('Alarma')} onSelected="Alarma" iconMenu="toys" textMenu="Inicio"/>
                    <MenuItem onPressItem={()=>navigate('Perfil')} onSelected="Perfil" iconMenu="home" textMenu="Propiedad"/>
                    <MenuItem onPressItem={()=>navigate('Visita')} onSelected="Visita" iconMenu="wc" textMenu="Visitas"/>
                    <MenuItem onPressItem={()=>navigate('Aviso')} onSelected="Aviso" iconMenu="notifications-active" textMenu="Avisos"/>
                    {/* <MenuItem onPressItem={()=>navigate('AreaComun')} onSelected="AreaComun" iconMenu="toys" textMenu="Area Común"/> */}
                    <MenuItem onPressItem={()=>navigate('EdoCuenta')} onSelected="EdoCuenta" iconMenu="confirmation-number" textMenu="Edo Cuenta"/>
                </View>
            </View>
        )
    
        
    }
}

const styles = StyleSheet.create({
    imgLogo:{
        height: 65,
        width: 65,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    menuHeader:{

        height:200, 
        backgroundColor:'white'
    },
    backgroundContent:{
        backgroundColor: "#BF05A9"
    },
    infoUser:{
        alignSelf: 'center',
        color: "#0070C1"
    },
    infoCondo:{
        alignSelf: 'center',
        color: "#BF05A9",
        fontWeight: "bold",
        fontSize: 20
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.notiCommunity
    }
}



export default connect(mapStateToProps)(MenuContent);