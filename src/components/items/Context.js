import React from 'react';
import { View } from 'react-native';


const Context = ({children})=>{
    return(
            // <ScrollView >
                <View style={stylex.trueCanvas}>
                    <View style={stylex.context}>
                        {children}
                    </View>
                </View>
            // </ScrollView>


    );
}


const stylex={
    context:{
        flex: 1,
        backgroundColor: "#fff",
        height: null,
        margin: 10,
        padding: 10,
        
        
        
    },
    trueCanvas:{
        flex: 1,
       //flexDirection: 'column',
        
        //flexDirection: 'column',
        backgroundColor: "#ECF0F5",
        //height: '100%',
        //minHeight: 550
        

    }
}

export  {Context}
