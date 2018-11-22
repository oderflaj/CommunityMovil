import React, {Component} from 'react';
import { View,Text, TouchableWithoutFeedback, Image } from 'react-native';
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
                            <Icon color="#CCC" name="arrow-back" size={30} style={{ paddingLeft:10}}/>
                        </TouchableWithoutFeedback>
                        <View style={styles.textHeader}>
                            <Text style={styles.title}>
                                {/* <Icon color="#fff" name={this.state.iconHeader} size={25} style={{ marginRight:20}}/> */}
                                {this.state.nameHeader}
                            </Text>    
                        </View>
                        <TouchableWithoutFeedback onPress={()=>this.state.navigation.navigate('Alarma')}>
                            <Image source={require('../../../assets/tsgiconc.png')} style={{width: 30, height: 30}} />
                        </TouchableWithoutFeedback>
                    </View>
                );
            break;

            default:
                return(
                    <View style={styles.frameH}>
                        {/* <View style={{flex:1,flexDirection:'row', justifyContent:"flex-start",justifyContent:"space-between"}}> */}
                            <TouchableWithoutFeedback onPress={()=>{
                                console.log(`Presiono MENU`)
                                //this.state.navigation.navigate('DrawerToggle')
                                this.state.navigation.toggleDrawer();
                                }}>
                                <Icon color="#CCC" name="menu" size={30} style={{ paddingLeft:10}}/>
                            </TouchableWithoutFeedback>
                            <View style={styles.textHeader}>
                                <Text style={styles.title}>
                                    {/* <Icon color="#fff" name={this.state.iconHeader} size={25} style={{ marginRight:20}}/> */}
                                    {this.state.nameHeader}
                                </Text>    
                            </View>
                            <TouchableWithoutFeedback onPress={()=>this.state.navigation.navigate('Alarma')}>
                                <Image source={require('../../../assets/tsgiconc.png')} style={{width: 30, height: 30}} />
                            </TouchableWithoutFeedback>
                        {/* </View> */}
                        
                        
                    </View>
                );
        }


    }
    
}

styles = {
    frameH:{
        backgroundColor:"#8080C0", 
        // backgroundColor:"red", 
        flexDirection:"row",
        //alignContent:"space-around",
        justifyContent:"space-between",
        height: 45,
        paddingTop: 10,
        paddingLeft: 6,
        paddingRight: 16,
        borderBottomColor:"#2C3B41"
    },
    title:{
        color: "#CCC",
        fontSize: 20,
        alignSelf: "center",
        
    },
    textHeader:{
        //width: "80%",
    }
}

export  {Header}
