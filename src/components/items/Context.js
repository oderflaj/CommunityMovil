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
        borderRadius: 5,
        borderColor: "#D7D7D7",
        borderWidth:2,
        padding: 10,
        // marginBottom: 60
        
        
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
