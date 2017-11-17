import React from 'react';
import {AsyncStorage} from 'react-native';


function login(_host, _user,_pwrd){
    
   console.log("Entro en Login")
   let result = fetch(_host, { 
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
    return result;
}

function xxx(){
    
   console.log("Entro en XXXXXXXXXXXXXXXXXXXXXXXXX")
}

export {login, xxx};