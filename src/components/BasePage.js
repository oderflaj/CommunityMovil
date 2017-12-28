import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Login from './Login';
import Menu from './Menu';
import * as RestOp from './functions/RestFunctions';
import Splash from './Splash'


class BasePage extends Component{

    constructor(props){
        super(props)
        this.state = {loged:undefined,mensaje:"Conectando con Community..."}
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
            console.debug("Ya esta true..........")
            return(
               <Menu/>
               
            );
        }
        return(
            // <View style={stylex.bgLogin}>
            //     <Image 
            //     style={stylex.bgLogin}
            //     source={require('./../image/bgLogin.png')}
            //     />
                <Login login={this.generalLogin.bind(this)} />
            // </View>
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