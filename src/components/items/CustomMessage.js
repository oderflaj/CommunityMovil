
import React, { Component } from 'react';
import { View, Text } from 'react-native';


class CustomMessage extends Component{
    constructor(props){
        super(props);
        this.state = {message:'Error al intentar ingresar a su cuenta.'};
    }

    render(){
        return(
            <View style={styles.styleError}>
                <Text style={styles.header}> 
                    Error
                </Text>
                <Text style={styles.message}>
                    {this.state.message}
                </Text>
            </View>
            
        );
    }

}

const styles = {
    header:{
        fontSize: 14,
        color:'#F3FFED',
        fontWeight: 'bold'
    },
    message:{
        fontSize: 12,
        color:'#F3FFED',
    },
    styleError:{
        
        alignSelf: 'center',
        backgroundColor: '#330000',
        padding: 10,
        borderRadius: 5
    }
};


//export default CustomMessage;
export {CustomMessage};