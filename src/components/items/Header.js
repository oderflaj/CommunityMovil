import React, {Component} from 'react';
import { View,Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {navigation:this.props.navigation, nameHeader:this.props.nameHeader};//Error al intentar ingresar a su cuenta.
    }

    
    render(){
        return(
            <View style={styles.frameH}>
                <TouchableWithoutFeedback onPress={()=>this.state.navigation.navigate('DrawerToggle')}>
                    <Icon color="#fff" name="menu" size={30} style={{ paddingLeft:10}}/>
                </TouchableWithoutFeedback>
                <View style={styles.textHeader}>
                    <Text style={styles.title}>
                        {this.state.nameHeader}
                    </Text>    
                </View>
                
            </View>
        );
    }
    
}

styles = {
    frameH:{
        backgroundColor:"#3C8DBC", 
        // backgroundColor:"red", 
        flexDirection:"row",
        alignContent:"stretch",
        justifyContent:"flex-start",
        height: 45,
        paddingTop: 10,
        paddingLeft: 6

        
    },
    title:{
        color: "#FFFFFF",
        fontSize: 20,
        alignSelf: "center",
        
    },
    textHeader:{
        width: "80%"
    }
}

export  {Header}
