import React from 'react';
import { View, StyleSheet } from 'react-native';


const Canvas =({children})=>{

    return(
    <View style={styles.fill}>
        {children}
    </View>
    );
}

const styles = {
    fill:{
        flex: 1,
        flexDirection: 'column',
        borderTopColor:"#222D32", 
        borderTopWidth:24
    }
}

export {Canvas}