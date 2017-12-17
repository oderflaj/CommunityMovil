import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatusColor = ({statusname,textshow,iconshow,colorshow}) => {
    let sizeText = (textshow.length + 3) * 7
    
    switch(statusname){
        case "success":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#DFF0D8',
                    borderRadius: 25,
                    borderColor:'#D6E9C6',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:3,
                    paddingRight:3,
                    width:sizeText,
                    //maxWidth:100,
                    maxHeight:18
                }}>
                    <Icon color='#3C763D' name={iconshow} size={12} /> 
                
                    <Text style={{
                        color:'#3C763D',
                        paddingLeft:5,
                        fontSize:10,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
        case "info":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#D9EDF7',
                    borderRadius: 25,
                    borderColor:'#BCE8F1',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:3,
                    paddingRight:3,
                    width:sizeText,
                    //maxWidth:100,
                    maxHeight:18
                }}>
                    <Icon color='#31708F' name={iconshow} size={12} /> 
                
                    <Text style={{
                        color:'#31708F',
                        paddingLeft:5,
                        fontSize:10,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
        case "warning":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#FCF8E3',
                    borderRadius: 25,
                    borderColor:'#FAEBCC',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:3,
                    paddingRight:3,
                    width:sizeText,
                    //maxWidth:100,
                    maxHeight:18
                }}>
                    <Icon color='#8A6D3B' name={iconshow} size={12} /> 
                
                    <Text style={{
                        color:'#8A6D3B',
                        paddingLeft:5,
                        fontSize:10,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
        case "danger":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#F2DEDE',
                    borderRadius: 25,
                    borderColor:'#EBCCD1',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:3,
                    paddingRight:3,
                    width:sizeText,
                    //maxWidth:100,
                    maxHeight:18
                }}>
                    <Icon color='#A94442' name={iconshow} size={12} /> 
                
                    <Text style={{
                        color:'#A94442',
                        paddingLeft:5,
                        fontSize:10,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
        default:
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:colorshow,
                    borderRadius: 25,
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:3,
                    paddingRight:3,
                    width:sizeText,
                    //maxWidth:100,
                    maxHeight:18
                }}>
                    <Icon color='#fff' name={iconshow} size={12} /> 
                
                    <Text style={{
                        color:'#fff',
                        paddingLeft:5,
                        fontSize:10,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
    }

    
}

export {StatusColor}