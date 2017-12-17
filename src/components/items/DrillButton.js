import React from 'react';
import { Button,View,Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const DrillButton = ({onPress,children,iconIlust,iconDrill,colorFont}) =>{

    const {textStyle, buttonStyle,contentMain,iconIlustStyle,iconDrillStyle} = styles;

    return(
        <TouchableOpacity 
            style={buttonStyle}
            onPress={onPress}
        >       
            <View style={iconIlustStyle}>
                <Icon color={colorFont} name={iconIlust} size={40} />
            </View>
            <View style={contentMain}>
                {children}
            </View>
            
            <View style={iconDrillStyle}>
                <Icon color={colorFont} name={iconDrill} size={30} />
            </View>
        </TouchableOpacity>
    );
    
}


const styles={
    iconIlustStyle:{
        width: '15%',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingBottom: 5,
        paddingTop: 5,

    },
    contentMain:{
        width: '75%',
        paddingLeft: 10,
        borderColor: '#858585',
        borderBottomWidth:1,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
        paddingBottom: 5,
        paddingTop: 5,
    },
    iconDrillStyle:{
        width: '10%',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: '#858585',
        borderBottomWidth:1,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
        paddingBottom: 5,
        paddingTop: 5,
    },
    buttonStyle:{
        //flex: 1,
        alignSelf:'stretch',
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row'
        
    }
};

//export default BigButton;
export {DrillButton};