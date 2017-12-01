import React from 'react';
import {AsyncStorage} from 'react-native';


async function login(_host, _user,_pwrd){
    
   //console.log("Entro en Login")
   let result = await fetch(`${_host}/token`, { 
    method: 'post', 
    headers: {
      //'Authorization': 'Basic '+ btoa('oderflaj@gmail.com:A1A1A1A1'), 
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    body: 'grant_type=password&password=' + _pwrd +'&username=' + _user
  }).then((responsex)=>{
        var _auth = JSON.parse(responsex._bodyText)
        ////////this.setState({login:false})
        if(_auth.access_token==undefined)
        {
            ////////console.log(_auth.error_description +"++++++++++++++++++++++++++++++++++") 
            ////////this.setState({message:_auth.error_description})
            ////////this.setState({error:true})
            return _auth.error_description
        }
        else
        {
            ////////console.log(_auth.access_token+"++++++++++++++++++++++++++++++++++") 
            AsyncStorage.setItem('host',_host)
            AsyncStorage.setItem('usuario',_user)
            AsyncStorage.setItem('password',_pwrd)
            AsyncStorage.setItem('token',_auth.access_token)

            return "ok"
        }
        
    })
    .then(responsey=>{
        //console.log(responsey)
        return responsey
    })
    .catch((error) => {
        console.error(error);
      });
    return result//.then(r=>{return r});
}

async function getCommunity(_action, _parameters){
    
    let _host = await AsyncStorage.getItem('host');
    let _token = await AsyncStorage.getItem('token');

    console.log("Entra getCommunity ->",`${_host}/api/data/${_action}`)

    return await fetch(`${_host}/api/data/${_action}`,{
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
            console.error(error);
            return null
          })
    
}

async function isLoged(){

    let isIt = false

    let _user = await AsyncStorage.getItem('usuario');
    console.log("isLoged------>",_user) 
    let _paswd = await AsyncStorage.getItem('password');
    console.log("isLoged------>",_paswd)
    let _token = await AsyncStorage.getItem('token');
    console.log("isLoged------>",_token)
    let _host = await AsyncStorage.getItem('host');
    console.log("isLoged------>",_host)
    console.log(isIt)

    if( _user==null || _paswd == null || _token ==null || _host == null)
        return false

    let result = await getCommunity("base")
    
    //Check if there is a token available 
    if(result.usuario == null)
    {
        //Wether the token is unavailable you should try to login one more time with the current credentials and renew the token
        let _login = await login(_host, _user, _paswd)
  
        //If the loging was successful we initialize the base info 
        if(_login=="ok")
        {
            result = await getCommunity("base")
            AsyncStorage.setItem('infobase',result)
            console.log(result)
            return true;
        }

        return false
    }
    else
    {
        AsyncStorage.setItem('infobase',result)
    }

    return true
}

export {login, isLoged};
