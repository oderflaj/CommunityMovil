import React from 'react';
import { Button,View,Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransparentButton = ({onPress,colorLine,sizefont,icon,text}) =>{
    colorLine = colorLine || '#2979FF'
    sizefont = sizefont || 14
    let iconsize = sizefont +2


    return(
        <View style={{ 
            borderColor:'#2979FF', 
            borderWidth:1, 
            borderRadius:50, 
            alignContent:'center',
            justifyContent:'center',
            padding:5,
            //maxWidth:180,
            alignSelf:'center',
            marginBottom:10,
            marginTop:10
            }}>
            <TouchableOpacity onPress={onPress}>
              <View style={{flexDirection:'row', }}>
                <View>
                <Icon color={colorLine} name={icon} size={iconsize} />
                </View>
                <View >
                  <Text style={{color:colorLine, fontSize:sizefont}}>{text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
    );
    
}


export {TransparentButton};