import React from 'react';
import { View,ScrollView } from 'react-native';

const BodyContain = ({children})=>{
    return(
        <ScrollView>
            <View style={styles.frame}>
                   
            </View>
        </ScrollView>
    )
}

styles={
    frame:{
        backgroundColor: "blue",
        height: "100%",
        margin: 20,
        borderRadius: 5
    }
}

export {BodyContain}