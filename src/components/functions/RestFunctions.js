import React from 'react';
import {AsyncStorage, NetInfo} from 'react-native';
//import {NavigationActions } from 'react-navigation'


async function login(_host, _user,_pwrd){
    
   console.log("Entro en Login 1 _host",_host,"_user",_user,"_pwrd",_pwrd)
   let result = await fetch(`${_host}/token`, { 
    method: 'post', 
    headers: {
      //'Authorization': 'Basic '+ btoa('oderflaj@gmail.com:A1A1A1A1'), 
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    body: 'grant_type=password&password=' + _pwrd +'&username=' + _user
  }).then((responsex)=>{ console.log("Entro en Login 2")
        var _auth = JSON.parse(responsex._bodyText)
        
        if(_auth.access_token==undefined)
        {

            return _auth.error_description
        }
        else
        {
            AsyncStorage.setItem('host',_host)
            AsyncStorage.setItem('usuario',_user)
            AsyncStorage.setItem('password',_pwrd)
            AsyncStorage.setItem('token',_auth.access_token)

            return "ok"
        }
        
    })
    .then(responsey=>{
        //console.debug("Resultado->",responsey)
        return responsey
    })
    .catch((error) => {console.debug("Entro a un error")
        console.error(error);
      });
    return result//.then(r=>{return r});
}

// async function getCommunity(_action, _parameters){
//     //AsyncStorage.setItem('host','http://localhost:40502')
//     let _host = await AsyncStorage.getItem('host');
//     let _token = await AsyncStorage.getItem('token');

//     console.log("Entra getCommunity ->",`${_host}/api/data/${_action}`)

//     await NetInfo.isConnected.fetch().then(isConnected => {
//         if( !isConnected )
//         {
//             console.error("No hay internet")
//             return {No:"100",Error:"Error al entrar a Community, compruebe su conexión a internet.", ErrorDetail:error}
//         }
//       });
    
//     let requestx = ''
   
//    if(_parameters !=undefined && _parameters != ''){
//     requestx = `${_host}/api/data/${_action}/${_parameters}`
//    }
//    else{
//     requestx = `${_host}/api/data/${_action}`
//    } 
//     let respost = undefined
//     return await fetch(requestx,{
//         method: 'get', 
//         headers: {
//             Authorization: `bearer ${_token}`
//             }
//         })
//         .then(resp=>resp.json())
//         .then(r=>{
//             return r
//         })
//         .catch((error) => {
//             console.error(error)
//             console.log('ERROR 1::::',error)
//         })
    
// }


async function getCommunity(_action, _parameters){
    AsyncStorage.setItem('host','http://community.tecstrag.com')
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('token');

    console.log("Entra getCommunity ->",`${_host}/api/data/${_action}`)

    await NetInfo.isConnected.fetch().then(isConnected => {
        if( !isConnected )
        {
            console.error("No hay internet")
            return {No:"100",Error:"Error al entrar a Community, compruebe su conexión a internet.", ErrorDetail:error}
        }
      });
    
    let requestx = ''
   
   if(_parameters !=undefined && _parameters != ''){
    requestx = `${_host}/api/data/${_action}/${_parameters}`
   }
   else{
    requestx = `${_host}/api/data/${_action}`
   } 
   //console.debug("getCommunity",requestx)
    return await fetch(requestx,{
        method: 'get', 
        headers: {
            Authorization: `bearer ${_token}`
            }
        })
        .then(resp=>resp.json())
        .then(r=>{
            return r
        })
        .catch((error) => {
            console.error(error)
            console.log('ERROR 1::::',error)
            return {No:"101",Error:"Error al entrar a Community, no se tiene sesion.", ErrorDetail:error}
        })
    
}



async function isLoged(){

    
    let _user = await AsyncStorage.getItem('usuario');
    //console.log("isLoged---_user--->",_user) 
    let _paswd = await AsyncStorage.getItem('password');
    //console.log("isLoged---_paswd--->",_paswd)
    let _token = await AsyncStorage.getItem('token');
    //console.log("isLoged---_token--->",_token)
    let _host = await AsyncStorage.getItem('host');
    //console.log("isLoged---_host--->",_host)
    let _infobase = JSON.parse( await AsyncStorage.getItem('infobase'));
    //console.log("isLoged---infobase--->",_infobase)

    if( _user==null || _paswd == null || _token ==null || _host == null)
        return false

    let result = undefined 
    
    try{
        result = await getCommunity("base")
    }
    catch(err){
        console.debug("Cayo error!!!!!",err)
    }
    
    if(result.Error != undefined){
        console.debug('Cacha error')
        if(result.No != '101')
            return result
    }
    console.debug('SIGUIO',)
    //Check if there is a token available 
    if(result.usuario == null || result.No == '101' )
    {
        //Wether the token is unavailable you should try to login one more time with the current credentials and renew the token
        let _login = await login(_host, _user, _paswd)
        console.debug("_login", _login)
        //If the loging was successful we initialize the base info 
        if(_login=="ok")
        {
            result = await getCommunity("base")
            AsyncStorage.setItem('infobase',JSON.stringify(result))
            //console.log(result)
            return true;
        }

        return false
    }
    else
    {
        //console.warn("SET isLoged---infobase--->")
        AsyncStorage.setItem('infobase',JSON.stringify(result))
    }

    return true
}

async function getBase() {
    let infobase = undefined
    await AsyncStorage.getItem('infobase').then(res=>JSON.parse(res)).then(result=>{
        //console.log(result)
        infobase = result
    });
    return infobase;
}




export {login, isLoged, getBase, getCommunity};
