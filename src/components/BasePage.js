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


class BasePage extends Component{

    constructor(props){
        super(props)
        this.generalLogin = this.generalLogin.bind(this)
        this.state = {loged:undefined,mensaje:"Conectando con Community...", notificationCommunity: {}}
        
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
            console.debug("El Origin..........",this.state.notificationCommunity.origin)
            if(this.state.notificationCommunity.origin != undefined && this.state.notificationCommunity.origin === 'selected')
            {
                let pushObject = JSON.stringify(this.state.notificationCommunity.data)
                console.warn(pushObject)
            }
            return( <Menu/>);
        }
        return(
                <Login LoginGral={this.generalLogin} />
        );
    }
}

const stylex =StyleSheet.create({
    bgLogin:{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      position: 'absolute',
      alignSelf: 'center',
      height: '100%',
      width: '100%'
    }
  });

export default BasePage;