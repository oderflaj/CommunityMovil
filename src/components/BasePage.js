import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Login from './Login';
import * as RestOp from './functions/RestFunctions';


class BasePage extends Component{

    constructor(props){
        super(props)
        this.state = {loged:false}
    }
    componentWillMount() {
        let x
    
        RestOp.isLoged().then(x =>JSON.parse(x)).then(obj=>{
          console.log("----->>>>>",obj)
          if(obj)
            this.setState({loged:true})
        });    
    }

    render(){

        if(this.state.loged)
        return(
            <View>
                <Text>
                Pantalla nueva
                </Text>
            </View>
        );
    
        return(
            <View style={stylex.bgLogin}>
                <Image 
                style={stylex.bgLogin}
                source={require('./../image/bgLogin.png')}
                />
                <Login/>
            </View>
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