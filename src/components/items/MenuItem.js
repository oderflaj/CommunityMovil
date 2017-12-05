import React from 'react';
import { View,Text,TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {DrawerNavigator} from 'react-navigation'

const MenuItem = ({onPressItem,iconMenu,textMenu,onSelected})=>{
    return(
        <TouchableHighlight onPress={()=>{
            AsyncStorage.setItem('menuItem',onSelected)
            onPressItem()
            }} underlayColor='#1E282C'>
            <View style={styles.frame}>
                <View style={{flexDirection:'row'}}>
                    <Icon color="grey" name={iconMenu} size={25} style={{marginRight: 10}}/>
                    <Text style={styles.textItem}>{textMenu}</Text>
                </View>
            </View>
        </TouchableHighlight>
        
    );
}

const styles = StyleSheet.create({
    frame:{
        
        borderBottomColor:"grey",
        borderBottomWidth:0.5,
        marginLeft: 3,
        marginRight: 3,
        padding: 10

    },
    textItem:{
        fontSize: 18,
        color: "grey"
    }
});


export {MenuItem};