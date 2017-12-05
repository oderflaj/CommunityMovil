import React, { Component } from 'react';
import { View,Text,StyleSheet, Button, Image, TouchableHighlight, Touchable, AsyncStorage } from 'react-native';
import {DrawerNavigator} from 'react-navigation'
import {MenuItem} from './items/MenuItem'
import * as RestOp from './functions/RestFunctions';

export default class MenuContent extends Component{
    constructor(props){
        super(props)
        this.state = {infobase:undefined, email:'', nombre:''}
    }


    render(){
        const {navigate} = this.props.navigation;
        let x =  this.state.infobase

        RestOp.getBase().then(r=>{
            //console.log("1-RestOp.getBase()--->>>",r)
            this.setState({infobase:r})
        })
        .then(()=>{
            x =  this.state.infobase
            //console.log("MenuContent---infobase---PROMISE>",x.usuario)
            //console.warn("MenuContent---infobase---PROMISE>",x.usuario)
            this.setState({email:x.usuario.email})
            this.setState({nombre: x.usuario.nombre + " " })
        })
        
        
        return(
            <View style={{borderTopColor:"#000", borderTopWidth:24, backgroundColor: "#222D32", height:"100%"} }>
                <View style={styles.menuHeader}>                    
                    <Image
                        style={styles.imgLogo}
                        source={require('./../image/tgslogo.jpg')}
                    />
                    <Text style={styles.infoUser} >{this.state.email}</Text>
                    <Text style={styles.infoUser} >{this.state.nombre}</Text>
                </View>
                <View style={styles.backgroundContent}>
                    <MenuItem onPressItem={()=>navigate('Alarma')} onSelected="Alarma" iconMenu="rss-feed" textMenu="Alarma"/>
                    <MenuItem onPressItem={()=>navigate('Perfil')} onSelected="Perfil" iconMenu="contacts" textMenu="Perfil"/>
                    <MenuItem onPressItem={()=>navigate('Visita')} onSelected="Visita" iconMenu="wc" textMenu="Visitas"/>
                    <MenuItem onPressItem={()=>navigate('Aviso')} onSelected="Aviso" iconMenu="notifications-active" textMenu="Avisos"/>
                    <MenuItem onPressItem={()=>navigate('AreaComun')} onSelected="AreaComun" iconMenu="toys" textMenu="Area Común"/>
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
        backgroundColor:'red'
    },
    backgroundContent:{
        backgroundColor: "#222D32"
    },
    infoUser:{
        alignSelf: 'center',
        color: "#FFFFFF"
    }
})

