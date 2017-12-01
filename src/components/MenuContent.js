import React, { Component } from 'react';
import { View,Text,StyleSheet, Button, Image } from 'react-native';
import {DrawerNavigator} from 'react-navigation'

export default class MenuContent extends Component{
    // static navigationOptions = ({navigation})=>({
    //     title:'Menu'
    // })

    render(){
        const {navigate} = this.props.navigation;

        return(
            <View>
                <View style={styles.menuHeader}>
                    
                    <Image
                        style={styles.imgLogo}
                        source={require('./../image/tgslogo.jpg')}
                    />
                </View>
                <View>
                    <Button 
                        onPress={()=>navigate('Alarma')}
                        title='Alarma'
                    />
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

