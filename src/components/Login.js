//Import Libraries
import React from 'react';
import { 
    View,
    Text,
    Image,
    TextInput,
    StyleSheet
 } from 'react-native';
import BigButton from './BigButton';

//Create Comnponents

const Login = () =>{
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
                <TextInput style={keyUser} placeholder="Introduzca la clave que llego a su email." multiline>

                </TextInput>

            </View>
            <BigButton onPress={()=>console.warn("Presiono el boton")}>
                ENTRAR
            </BigButton> 
        </View>
    );
    
};

const styles = StyleSheet.create({
    imgLogo:{
        height: 125,
        width: 125
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