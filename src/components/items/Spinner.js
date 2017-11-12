import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({size}) =>{
    return(
        <View style={styleMedia.spinnerStyle}>
            <ActivityIndicator size={size||'large'}  />
        </View>
    );
};

const styleMedia = {
    spinnerStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight:40        
    }
};

export {Spinner}