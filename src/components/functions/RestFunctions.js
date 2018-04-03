import React from 'react';
import {AsyncStorage, NetInfo} from 'react-native';
import { Permissions, Notifications } from 'expo';


async function login(_host, _user,_pwrd){
    
   console.debug("Entro en Login 1 _host",_host,"_user",_user,"_pwrd",_pwrd)
   let result = await fetch(`${_host}/token`, { 
    method: 'post', 
    headers: {
      //'Authorization': 'Basic '+ btoa('oderflaj@gmail.com:A1A1A1A1'), 
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    body: 'grant_type=password&password=' + _pwrd +'&username=' + _user
  }).then((responsex)=>{ 
        
        var _auth = JSON.parse(responsex._bodyText)
        console.warn( `Entro en Login 2[${_auth}]`)
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
        console.debug("Resultado->",responsey)
        return responsey
    })
    .catch((error) => {console.debug("Entro a un error")
        console.error(error);
        throw error
      });
    return result//.then(r=>{return r});
}


async function getCommunity(_action, _parameters, _verb){
    //AsyncStorage.setItem('host','http://community.tecstrag.com')
    _verb = _verb || 'get'
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('token');

    console.debug("Entra getCommunity ->",`${_host}/api/data/${_action}`)

    // await NetInfo.isConnected.fetch().then(isConnected => {
    //     if( !isConnected )
    //     {
    //         console.error("No hay internet")
    //         return {No:"100",Error:"Error al entrar a Community, compruebe su conexión a internet.", ErrorDetail:error}
    //     }
    //   });
    
    let requestx = ''
   
   if(_parameters !=undefined && _parameters != ''){
    requestx = `${_host}/api/data/${_action}/${_parameters}`
   }
   else{
    requestx = `${_host}/api/data/${_action}`
   } 
   console.debug("getCommunity",requestx)
    return await fetch(requestx,{
        method: _verb, 
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
            //return {No:"101",Error:"Error al entrar a Community, no se tiene sesion.", ErrorDetail:error}
            throw {No:"101",Error:"Error al entrar a Community, no se tiene sesion.", ErrorDetail:error}
        })

}

async function postCommunity(_action, _parameters){
    //AsyncStorage.setItem('host','http://community.tecstrag.com')
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('token');

    //console.log("Entra getCommunity ->",`${_host}/api/data/${_action}`)

    // await NetInfo.isConnected.fetch().then(isConnected => {
    //     if( !isConnected )
    //     {
    //         console.error("No hay internet")
    //         return {No:"100",Error:"Error al entrar a Community, compruebe su conexión a internet.", ErrorDetail:error}
    //     }
    //   });
    
    let requestx = ''
   

    if(_parameters !=undefined && _parameters != ''){
        requestx = `${_host}/api/data/${_action}/${_parameters}`
    }
    else{
        requestx = `${_host}/api/data/${_action}`
    } 


    //console.debug("postCommunity",requestx)
    return await fetch(requestx,{
            method: 'post', 
            headers: {
                'Authorization': `bearer ${_token}`
                },
            // body:_parameters
        })
        .then(resp=>resp.json())
        .then(r=>{
            console.debug("Resultado del post",r)
            return r
        })
        .catch((error) => {
            console.error(error)
            return {No:"101",response:`Error`, detail:`Error al entrar a Community, no se tiene sesion. ${error}`}
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
        //console.debug("isLoged---->>>",result)
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
        try{            
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
        catch(err)
        {
            return {No:"102",Error:"Error intentar iniciar sesion.", ErrorDetail:err}
        }
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

async function registerForPushNotificationsAsync() {

    try{
        const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        console.warn("Actual estado de notificaciones->",finalStatus)
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            console.log("No acepto notificaciones!!!")
            return;
        }
        let _infobase 
        try{
            _infobase = JSON.parse( await AsyncStorage.getItem('infobase'));
            //console.warn("INFOBASE->",_infobase)
            if(_infobase==null){
                //console.warn("INFOBASE->Entra a hacer algo......")
                result = await getCommunity("base")
                AsyncStorage.setItem('infobase',JSON.stringify(result))
                _infobase = JSON.parse( await AsyncStorage.getItem('infobase'));
                //console.warn("2 INFOBASE->",_infobase)
            }
            
        }
        catch(error){
            console.debug("No encontro información del usuario")
            return
        }
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
    
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // return fetch(PUSH_ENDPOINT, {
        //   method: 'POST',
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     token: {
        //       value: token,
        //     },
        //     user: {
        //       username: 'Brent',
        //     },
        //   }),
        // });

        AsyncStorage.setItem('usertoken',token)

        let para = `${_infobase.usuario.id}/${token}`  
        
        

        let resultpost = undefined
        
        try{
            resultpost = await postCommunity('pushNotToken',para)
        }
        catch(error){
            return {No:"104",response:`Error`, detail:`Error al registrar Notificaciones en Community. ${error}`}     
        }

        if(resultpost.resp.response != "OK")
        {
            console.debug("Cacha el error!!!",resultpost)
            return {No:"103",response:`Error`, detail:`Error al mandar el token. ${resultpost.resp.detail}`}    
        }
        else
        {
            return {response:`OK`, detail:`Se registro correctamente el token`}
        }

        console.warn('TOKEN',token)
    }
    catch(error)
    {
        return {No:"103",response:`Error`, detail:`Error al realizar el registro de notificaciones, intentelo mas tarde. ${error}`}
        //registerForPushNotificationsAsync()
    }
  }

export {login, isLoged, getBase, getCommunity, registerForPushNotificationsAsync};
