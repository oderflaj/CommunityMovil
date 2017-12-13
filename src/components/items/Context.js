import React from 'react';
import { View,ScrollView } from 'react-native';


const Context = ({children})=>{
    return(
            <ScrollView >
                <View style={stylex.trueCanvas}>
                    <View style={stylex.context}>
                        {children}
                    </View>
                </View>
            </ScrollView>
            
        
    );
}


const stylex={
    context:{
        backgroundColor: "#fff",
        height: "100%",
        margin: 10,
        borderRadius: 5,
        borderColor: "#E6EAEF",
        borderWidth:1,
        padding: 10
    },
    trueCanvas:{
        backgroundColor: "#ECF0F5", 
        minHeight: 500
    }
}

export  {Context}