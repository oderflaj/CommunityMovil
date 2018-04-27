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


//Create Comnponents
 class Login extends Component{
     constructor(props){
         super(props);
         this.state = {login:false,error:false, message:'',uniquecode:''};
     }
     
     
    //  async loginx(_host,_user,_pwrd){
        
    //     await RestOp.login(_host,_user,_pwrd).then(r=>console.log("res---TTTTT>",r),r=>console.log("Todo fallo",r));
    //  }

     onEntrarPress(){
        
        let descript = MisFun.decriptaCommunity(this.state.uniquecode).split('-')
        //console.warn("Desencriptado->",descript)
        const _host = (descript[0].includes("http://")?descript[0]:`http://${descript[0]}`)
        const _user = descript[1]
        const _pwrd = descript[2]


        
        

        this.setState({spin:true})
        this.setState({error:false})
        this.setState({message:''})
        
        RestOp.login(_host,_user,_pwrd).then(
            
            r=>{
                if(r === "ok")
                {
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
                                this.props.generalLogin();
                                //this.props.navigation.navigate('Alarma',{})
                            }
                        }
                    )
                }
                else
                {
                    //console.log(res)
                    this.setState({message:`Error al intentar entrar a sesión. ${r}`})
                    this.setState({error:true})
                }
                
                
            },
            r=>{
                this.setState({message:"Error al intentar entrar a sesión. Intente de nuevo, si el problema persiste contacte a su administrador para que le proporcione una actualización de clave."})
                this.setState({error:true})
                this.setState({spin:false})
            }
        );
        
        
         
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
                Ingresar
            </BigButton>
         );
     }

     //Render Components
     render(){
        
        const {imgLogo, mainContainer, keyUser,labelUser} = styles;
         return(
            <View style={stylex.bgLogin}>
                <Image 
                style={stylex.bgLogin}
                source={require('./../image/bgLogin1.png')}
                />


                <View style={mainContainer}>
                    <View>
                        <Image
                            style={imgLogo}
                            source={require('./../../assets/C.png')}
                        />
                        <Text style={{color: "#BF05A9",
                            fontSize: 20,
                            alignSelf: "center",
                            fontWeight:'800'

                            }}>
                            COMMUNITY
                        </Text>
                    </View> 
                    
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
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        borderColor: '#FFFFAA',
        borderRadius: 10,
        paddingRight: 10,
		paddingLeft: 10,
        paddingTop:15,
        color:'#fff'
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