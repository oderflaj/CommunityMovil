//Import Libraries
import React, {Component} from 'react';
import { 
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    AsyncStorage
 } from 'react-native';
import {BigButton, CustomMessage, Spinner} from "./items/IndexItem";
import * as RestOp from './../components/functions/RestFunctions';
import * as MisFun from './../components/functions/MiscFunctions';

import axios from 'axios';

//Create Comnponents
 class Login extends Component{
     constructor(props){
         super(props);
         this.state = {login:false,error:false, message:'',uniquecode:''};
         console.debug("---->>",props.LoginGral)
     }
     
     
     async loginx(_host,_user,_pwrd){
        
        await RestOp.login(_host,_user,_pwrd).then(r=>console.log("res---TTTTT>",r),r=>console.log("Todo fallo",r));
     }

     onEntrarPress(){
        
        let descript = MisFun.decriptaCommunity(this.state.uniquecode).split('-')
        console.log(descript)
        // const _host = 'http://community.tecstrag.com'
        // const _user = 'acarbajal@tecstrag.com'
        // const _pwrd = 'A1A1A1A1'
        const _host = descript[0]
        const _user = descript[1]
        const _pwrd = descript[2]
        
        //this.loginx(_host,_user,_pwrd);
        

        this.setState({spin:true})
        this.setState({error:false})
        this.setState({message:''})
        
        RestOp.login(_host,_user,_pwrd).then(
            r=>{
                if(r === "ok")
                {
                    // let resultPush = RestOp.registerForPushNotificationsAsync()
                    // if(resultPush.response != "OK"){
                    //     console.debug("Error en el TOKEN",resultPush)
                    //     this.setState({message:resultPush.detail})
                    //     this.setState({error:true})
                    // }
                    // else{
                    //     this.props.login()
                    // }

                    RestOp.registerForPushNotificationsAsync().then(
                        r2=>{
                            console.debug("R2",r2)

                            if(r2.response !="OK")
                            {
                                this.setState({message:r2.detail})
                                this.setState({error:true})
                                console.debug("Error en el Push")
                            }
                            else{
                                console.debug("EJecucion Correcta---------------",this.props)
                                this.props.LoginGral
                            }
                        }
                    )
                }
                else
                {
                    //console.log(res)
                    this.setState({message:"Error al intentar entrar a sesión."})
                    this.setState({error:true})
                }
                
                this.setState({spin:false})
            },
            r=>{
                this.setState({message:"Error al intentar entrar a sesión. Intente de nuevo, si el problema persiste contacte a su administrador para que le proporcione una actualización de clave."})
                this.setState({error:true})
                this.setState({spin:false})
            }
        );
        
        
        

        //fetch(_host, { 
        //    method: 'post', 
        //    headers: {
        //      //'Authorization': 'Basic '+ btoa('oderflaj@gmail.com:A1A1A1A1'), 
        //      'Content-Type': 'application/x-www-form-urlencoded'
        //    }, 
        //    body: 'grant_type=password&password=' + _pwrd +'&username=' + _user
        //  }).then((responsex)=>{
        //        var _auth = JSON.parse(responsex._bodyText)
        //        this.setState({spin:false})
        //        if(_auth.access_token==undefined)
        //        {
        //            console.log(_auth.error_description) 
        //            this.setState({message:_auth.error_description})
        //            this.setState({error:true})
        //        }
        //        else
        //        {
        //            console.log(_auth.access_token) 
        //            AsyncStorage.setItem('host',_host)
        //            AsyncStorage.setItem('usuario',_user)
        //            AsyncStorage.setItem('password',_pwrd)
        //            AsyncStorage.setItem('token',_auth.access_token)
        //        }
        //        
        //    });

        
         
     }

     renderError(){
         if(this.state.error)
         {
            return <CustomMessage style={{alignSelf: 'center'}} typeMessage='Error' messageText={this.state.message} />;
         }

         return <View/>;
         
     }
     renderButton(){
         if(this.state.spin)
         {
             return <Spinner size=""/>;
         }

         return(
            <BigButton onPress={
                    this.onEntrarPress.bind(this)
                }>
                ENTRAR
            </BigButton>
         );
     }

     //Render Components
     render(){
        //console.log(MisFun.decriptaCommunity('1B24094509450C4805F5050005001A871CCE15D015D0213615FB1B9009451E3F1CB00945193B1A871D680945061B05FB10A70C48061B1CCE1AFE1CB01A871CCE15D00A5E05FB1A8705FB061B04B105FB268505FB1D540E100945193B1A871D680945061B05FB10A71CB01A871CCE15D00A5E0BF51ADF0BF51ADF0BF51ADF0BF51ADF'))
        const {imgLogo, mainContainer, keyUser,labelUser} = styles;
         return(
            <View style={stylex.bgLogin}>
                <Image 
                style={stylex.bgLogin}
                source={require('./../image/bgLogin.png')}
                />


                <View style={mainContainer}> 
                    <Image
                        style={imgLogo}
                        source={require('./../image/tgslogo.jpg')}
                    />
                    <View style={{justifyContent: 'space-around'}}>
                        <Text style={labelUser}>
                            CLAVE UNICA USUARIO
                        </Text>
                        <TextInput  style={keyUser} 
                                    placeholder="Introduzca la clave que llego a su email." 
                                    multiline 
                                    onEndEditing={this.clearFocus}
                                    blurOnSubmit={true}
                                    onChangeText={(clave)=>{this.setState({uniquecode:clave})}}
                                    // value='1B24094509450C4805F5050005001A871CCE15D015D0213615FB1B9009451E3F1CB00945193B1A871D680945061B05FB10A70C48061B1CCE1AFE1CB01A871CCE15D00A5E05FB1A8705FB061B04B105FB268505FB1D540E100945193B1A871D680945061B05FB10A71CB01A871CCE15D00A5E0BF51ADF0BF51ADF0BF51ADF0BF51ADF'
                                    //value='1B24094509450C4805F5050005001A871CCE15D015D0213615FB1B9009451E3F1CB00945193B1A871D680945061B05FB10A71CB01A871CCE15D00A5E05FB1A8705FB061B04B105FB268505FB1D540E100945193B1A871D680945061B05FB10A71CB01A871CCE15D00A5E0BF51ADF0BF51ADF0BF51ADF0BF51ADF'
                                    />
                    
                    </View>
                    {this.renderError()}
                    {this.renderButton()}
                </View>

            </View>
         );
     }
 }


const styles = StyleSheet.create({
    imgLogo:{
        height: 125,
        width: 125,
        borderRadius: 10
    },
    mainContainer:{
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    labelUser:{
        paddingBottom: 10,
        color: '#FFFFFF',
        fontWeight: '600',
        alignSelf: 'center',
        fontSize: 16,
        backgroundColor:'transparent',

    },
    keyUser:{
        height: 180,
        width: 280,
        backgroundColor: '#FFFFCC',
        borderColor: '#FFFFAA',
        borderRadius: 10,
        paddingRight: 10,
		paddingLeft: 10,
		paddingTop:15
    }
})

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

export default Login;