import React from 'react';
import { View, Image } from 'react-native';
import {Spinner} from './items/Spinner'


const Splash = () =>{
    return(
        <View style={styles.contain}>
            <Image style={styles.look}
                source={require('./../image/tgslogoCC.png')}
                />
            <Spinner/>
        </View>
    );
}

const styles = {
    contain:{
        justifyContent: 'center',
        flexDirection: 'column',
        
        backgroundColor: '#fff',
        alignItems: 'center',
        height: '100%'
    },
    look:{
        margin: 30,
        borderRadius: 10
    }
}

export default Splash