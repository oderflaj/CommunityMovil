//Import Libraries
import React, {Component} from 'react';
import { 
    View,
    Text,
    Image,
    TextInput,
    StyleSheet
 } from 'react-native';
import {BigButton, CustomMessage, Spinner} from "./items/IndexItem";
import axios from 'axios';

//Create Comnponents
 class Login extends Component{
     constructor(props){
         super(props);
         this.state = {login:false,error:false, message:''};
     }
     
     onEntrarPress(){
        
         const _host = 'http://community.tecstrag.com/token'
         const _user = 'oderflaj@gmail.com'
         const _pwrd = 'A1A1A1A1'
        
        fetch(_host, { 
            method: 'post', 
            headers: {
              //'Authorization': 'Basic '+ btoa('oderflaj@gmail.com:A1A1A1A1'), 
              'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: 'grant_type=password&password=' + _pwrd +'&username=' + _user
          }).then((responsex)=>{
                var _auth = JSON.parse(responsex._bodyText)
                if(_auth.access_token==undefined)
                {
                    console.log(_auth.error_description) 
                }
                else
                {
                    console.log(_auth.access_token) 
                }
                //console.log(_auth)
                //console.log(_auth.access_token)
                //console.log(responsex)
            });

        
         this.setState({login:true})
     }

     renderError(){
         if(this.state.error)
         {
            return <CustomMessage style={{alignSelf: 'center'}} typeMessage='Error' messageText={this.state.message} />;
         }

         return <View/>;
         
     }
     renderButton(){
         if(this.state.login)
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

     render(){
        const {imgLogo, mainContainer, keyUser,labelUser} = styles;
         return(
             <View style={mainContainer}> 
                 <Image
                     style={imgLogo}
                     source={require('./../image/tgslogo.jpg')}
                 />
                 <View style={{justifyContent: 'space-around'}}>
                     <Text style={labelUser}>
                         CLAVE UNICA USUARIO
                     </Text>
                     <TextInput style={keyUser} placeholder="Introduzca la clave que llego a su email." multiline />
                  
                 </View>
                 {this.renderError()}
                 {this.renderButton()}
             </View>
         );
     }
 }

// const Login = () =>{
//     const {imgLogo, mainContainer, keyUser,labelUser} = styles;
//     return(
//         <View style={mainContainer}> 
//             <Image
//                 style={imgLogo}
//                 source={require('./../image/tgslogo.jpg')}
//             />
//             <View style={{justifyContent: 'space-around'}}>
//                 <Text style={labelUser}>
//                     CLAVE UNICA USUARIO
//                 </Text>
//                 <TextInput style={keyUser} placeholder="Introduzca la clave que llego a su email." multiline />
//           
//             </View>
//             <CustomMessage style={{alignSelf: 'center'}} />
//             <BigButton onPress={()=>console.warn("Presiono el boton")}>
//                 ENTRAR
//             </BigButton> 
//         </View>
//     );
//};

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
        height: 80,
        width: 280,
        backgroundColor: '#FFFFCC',
        borderColor: '#FFFFAA',
        borderRadius: 10,
        paddingRight: 10,
		paddingLeft: 10,
		paddingTop:15
    }
})

//Render
export default Login;