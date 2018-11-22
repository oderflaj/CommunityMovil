import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import Login from './Login';
import Menu from './Menu';
import * as RestOp from './functions/RestFunctions';
import {
    Permissions,
    Notifications,
  } from 'expo';
import Splash from './Splash'

import {connect} from 'react-redux'
import store from "../../store";
import {updateInfobase} from "../actions"


class BasePage extends Component{

    constructor(props){
        super(props)
        this.state = {loged:undefined,mensaje:"Conectando con Community...", notificationCommunity: {}}
        console.debug("En constructor->",props)
        this.updateInfobase = this.updateInfobase.bind(this)
        
    }
    componentWillMount() {
        let x
    
        RestOp.isLoged().then(x =>{
            
            if(x.Error != undefined)
                return x

            return JSON.parse(x)

        }).then(obj=>{
          console.debug("OBJ----->>>>>",obj)
          if(obj && obj.Error == undefined){
            this.setState({loged:true})
          }
          else if(!obj){
            this.setState({loged:false})
          }
          else{
            this.setState({loged:undefined})
            this.setState({mensaje:"Error " + obj.No + ": " + obj.Error})
          }
           
        });  
    }

    _handleNotification = (notification) => {
        this.setState({notificationCommunity: notification});
      };

    generalLogin(){
        console.debug("Se ha logeado")
        this.setState({loged:true})
    }

    render(){
        if(this.state.loged==undefined)
            return(
                <Splash/>
            );
        
        console.debug(`Hara notificaciones 1  this.state.loged->${this.state.loged}`)
        
        if(this.state.loged)
        { 
            //Seccion de notificaciones Inicio
            
            //RestOp.registerForPushNotificationsAsync();
            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            console.debug("Hara notificaciones 2")
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
        
            //Seccion de notificaciones Fin
            console.debug("Ya esta firmado en Community..........")
            console.debug(`Empieza el IF ------------------notificationCommunity[${JSON.stringify(this.state.notificationCommunity,null,4)}]`)
            
            if(this.state.notificationCommunity.origin != undefined && this.state.notificationCommunity.origin === 'selected')
            {
                let pushObject = this.state.notificationCommunity.data
                
                console.debug(`Se Escribe Modulo ${pushObject.modulo}`)

                switch(pushObject.modulo)
                {
                    case "Visita":
                        console.debug(`Entro en Vista---------------------------`)
                        //AsyncStorage.setItem('menuItemSelected',"Visita")
                        //this.props.navigation.navigate('VisitaDetalle',{propiedad:pushObject.objeto, header:pushObject.header});
                        //return( <Menu modulo={'VisitaDetalle'} param={[{propiedad:pushObject.objeto},{header:pushObject.header}]}/>);
                        // return(
                        //         <Login  modulo={'VisitaDetalle'} param={[{propiedad:pushObject.objeto},{header:pushObject.header}]}/>
                        // );

                        //this.props.notification = {modulo:pushObject.modulo, objeto:{propiedad:pushObject.objeto,header:pushObject.header}}
                        //console.debug(`Este es el objeto que se muestra:[${pushObject.modulo}] \n\n objeto ${objeto} `)
                        //console.debug("Despues de setear PROPS...",this.props)
                }
            }
            console.debug("Termino el IF ------------------")
            return( <Menu />);
        }
        AsyncStorage.setItem('infobase',{})
        return(
                <Login generalLogin={this.generalLogin.bind(this)}/>
        );
    }

    updateInfobase(infobase){
        store.dispatch(updateInfobase(infobase))
    }
}





const mapStateToProps = state => {
    return {
        infobase: state.infobase
    }
}



export default connect(mapStateToProps)(BasePage);