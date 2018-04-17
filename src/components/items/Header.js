import React, {Component} from 'react';
import { View,Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {navigation:this.props.navigation, 
            nameHeader:this.props.nameHeader, 
            iconHeader:this.props.iconHeader || '', 
            menuDirection:this.props.menuDirection || '', 
            menuItem: this.props.menuItem || '',
            menuItemParams: this.props.menuItemParams || {}
        };//Error al intentar ingresar a su cuenta.
    }

    
    render(){
        
        switch(this.state.menuDirection){
            case 'back':
            return(
                    <View style={styles.frameH}>
                        <TouchableWithoutFeedback 
                        //onPress={()=>this.state.navigation.goBack()}
                        onPress={() =>this.props.navigation.navigate(this.state.menuItem,this.state.menuItemParams)}
                        >
                            <Icon color="#4472C4" name="arrow-back" size={30} style={{ paddingLeft:10}}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.textHeader}>
                            <Text style={styles.title}>
                                {/* <Icon color="#fff" name={this.state.iconHeader} size={25} style={{ marginRight:20}}/> */}
                                {this.state.nameHeader}
                            </Text>    
                        </View>
                        
                    </View>
                );
            break;

            default:
                return(
                    <View style={styles.frameH}>
                        <TouchableWithoutFeedback onPress={()=>this.state.navigation.navigate('DrawerToggle')}>
                            <Icon color="#4472C4" name="menu" size={30} style={{ paddingLeft:10}}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.textHeader}>
                            <Text style={styles.title}>
                                {/* <Icon color="#fff" name={this.state.iconHeader} size={25} style={{ marginRight:20}}/> */}
                                {this.state.nameHeader}
                            </Text>    
                        </View>
                        
                    </View>
                );
        }

        
    }
    
}

styles = {
    frameH:{
        backgroundColor:"#F9E8F7", 
        // backgroundColor:"red", 
        flexDirection:"row",
        alignContent:"stretch",
        justifyContent:"flex-start",
        height: 45,
        paddingTop: 10,
        paddingLeft: 6,
        borderBottomColor:"#2C3B41"
        
    },
    title:{
        color: "#BF05A9",
        fontSize: 20,
        alignSelf: "center",
        
    },
    textHeader:{
        width: "80%",
    }
}

export  {Header}
