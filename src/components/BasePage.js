import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Login from './Login';
import Menu from './Menu';
import * as RestOp from './functions/RestFunctions';
import {
    Permissions,
    Notifications,
  } from 'expo';
import Splash from './Splash'
import {connect} from 'react-redux'


class BasePage extends Component{

    constructor(props){
        super(props)
        this.state = {loged:undefined,mensaje:"Conectando con Community...", notificationCommunity: {}}
        console.debug("En constructor->",props)
        
    }
    componentWillMount() {
        let x
    
        RestOp.isLoged().then(x =>{
            
            if(x.Error != undefined)
                return x

            return JSON.parse(x)

        }).then(obj=>{
          //console.warn("OBJ----->>>>>",obj)
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

        if(this.state.loged)
        { 
            //Seccion de notificaciones Inicio
            
            //RestOp.registerForPushNotificationsAsync();
            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
        
            //Seccion de notificaciones Fin
            //console.debug("Ya esta firmado en Community..........")
            
            if(this.state.notificationCommunity.origin != undefined && this.state.notificationCommunity.origin === 'selected')
            {
                let pushObject = this.state.notificationCommunity.data
                
                console.debug(pushObject)
                switch(pushObject.modulo)
                {
                    case "Visita":
                        //this.props.navigation.navigate('VisitaDetalle',{propiedad:pushObject.objeto, header:pushObject.header});
                        //return( <Menu modulo={'VisitaDetalle'} param={[{propiedad:pushObject.objeto},{header:pushObject.header}]}/>);
                        // return(
                        //         <Login  modulo={'VisitaDetalle'} param={[{propiedad:pushObject.objeto},{header:pushObject.header}]}/>
                        // );
                        this.props.notification = {modulo:pushObject.modulo, objeto:{propiedad:pushObject.objeto,header:pushObject.header}}
                        console.debug("Despues de setear PROPS...",this.props)
                }
            }
            return( <Menu />);
        }
        return(
                <Login generalLogin={this.generalLogin.bind(this)}/>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        notification: state.notiCommunity
    }
}

export default connect(mapStateToProps)(BasePage);