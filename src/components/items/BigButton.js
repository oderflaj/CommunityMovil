import React from 'react';
import { Button,View,Text,TouchableOpacity } from 'react-native';

const BigButton = ({onPress,children}) =>{

    const {textStyle, buttonStyle} = styles;

    return(
        <TouchableOpacity 
            style={buttonStyle}
            onPress={onPress}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
    
}


const styles={
    textStyle:{
        
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonStyle:{
     
        alignSelf:'stretch',
        backgroundColor: '#C94155',
        borderRadius: 5,
        borderWidth:0,
        marginLeft: 30,
        marginRight: 30,
        
    }
};

//export default BigButton;
export {BigButton};