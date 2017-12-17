// import React from 'react';
import React,{Component} from 'react';
import { View,StyleSheet,Text } from 'react-native';

class LabelValue extends Component {
    constructor(props){
        super(props);
        this.state = {labelx:this.props.labelx||'', valuex:this.props.valuex||''};
    }
    

    render() {
        return (
            <View style={styles.contentlv}>
                <Text style={styles.labelstyle}>{this.state.labelx}</Text>
                <Text style={styles.valuestyle}>{this.state.valuex}</Text>
            </View>
        );
    }
}


// const LabelValue =({labelx,valuex}) => {
    
//     return (
//         <View style={styles.contentlv}>
//             <Text style={styles.labelstyle}>{labelx}</Text>
//             <Text style={styles.valuestyle}>{valuex}</Text>
//         </View>
//     );
    
// }

const styles = StyleSheet.create({
    contentlv:{
        flex: 0,
        flexDirection: 'column',
        marginBottom: 10

    },
    labelstyle:{
        fontSize:16, 
        fontWeight:'bold' 
    },
    valuestyle:{
        fontSize:15,
        paddingLeft: 5
    }
})
export {LabelValue}