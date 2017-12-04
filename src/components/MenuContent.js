import React, { Component } from 'react';
import { View,Text,StyleSheet, Button, Image, TouchableHighlight, Touchable } from 'react-native';
import {DrawerNavigator} from 'react-navigation'
import {MenuItem} from './items/MenuItem'
// import Icon from 'react-native-vector-icons/MaterialIcons'

export default class MenuContent extends Component{
    // static navigationOptions = ({navigation})=>({
    //     title:'Menu'
    // })

    render(){
        const {navigate} = this.props.navigation;

        return(
            <View style={{marginTop:24}}>
                <View style={styles.menuHeader}>
                    
                    <Image
                        style={styles.imgLogo}
                        source={require('./../image/tgslogo.jpg')}
                    />
                </View>
                <View>
                    <MenuItem onPressItem={()=>navigate('Alarma')} iconMenu="rss-feed" textMenu="Alarma"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgLogo:{
        height: 65,
        width: 65,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    },
    menuHeader:{

        height:200, 
        backgroundColor:'red'
    }
})

