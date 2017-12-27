import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatusColor = ({statusname,textshow,iconshow,colorshow,iconsize,textsize, heightstatus,colortext}) => {
    let factor =  7

    if(textsize != undefined)
    {
        factor = (textsize * 7) / 11
    }

    let longStatus = (textshow.length + 3) * factor
    iconsize = iconsize || 12
    textsize = textsize || 10
    heightstatus = heightstatus || 18
    colortext = colortext || '#000'
    colorshow = colorshow || '#fff'

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
                    width:longStatus,
                    //maxWidth:100,
                    maxHeight:heightstatus
                }}>
                    <Icon color='#3C763D' name={iconshow} size={iconsize} /> 
                
                    <Text style={{
                        color:'#3C763D',
                        paddingLeft:5,
                        fontSize:textsize,
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
                    width:longStatus,
                    //maxWidth:100,
                    maxHeight:heightstatus
                }}>
                    <Icon color='#31708F' name={iconshow} size={iconsize} /> 
                
                    <Text style={{
                        color:'#31708F',
                        paddingLeft:5,
                        fontSize:textsize,
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
                    width:longStatus,
                    //maxWidth:100,
                    maxHeight:heightstatus
                }}>
                    <Icon color='#8A6D3B' name={iconshow} size={iconsize} /> 
                
                    <Text style={{
                        color:'#8A6D3B',
                        paddingLeft:5,
                        fontSize:textsize,
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
                    width:longStatus,
                    //maxWidth:100,
                    maxHeight:heightstatus
                }}>
                    <Icon color='#A94442' name={iconshow} size={iconsize} /> 
                
                    <Text style={{
                        color:'#A94442',
                        paddingLeft:5,
                        fontSize:textsize,
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
                    width:longStatus,
                    //maxWidth:100,
                    maxHeight:heightstatus
                }}>
                    <Icon color={colortext} name={iconshow} size={iconsize} /> 
                
                    <Text style={{
                        color:colortext,
                        paddingLeft:5,
                        fontSize:textsize,
                    }}>
                        {textshow}
                    </Text>
                </View>
            )
            break;
    }

    
}

export {StatusColor}