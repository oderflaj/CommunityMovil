import React,{Component} from 'react';
import { View,StyleSheet,Text } from 'react-native';
/*
Properties
--------------------------------------------------
+ labelsize
+ valuesize
+ backgroundcolor
*/
class Marquee extends Component {
    constructor(props){
        super(props);
        this.state = {labelx:this.props.labelx||'', valuex:this.props.valuex||''};
    }
    
    header(){
        let labelsize = this.props.labelsize || 16
        let bkgdcolor = this.props.backgroundcolor || '#5B9BD5'

        const lstyle = {
            fontSize: labelsize,
            color: "#fff"
        }

        return (
            <View style={{
                    flexDirection:'row', 
                    backgroundColor:bkgdcolor, 
                    justifyContent:'center',
                    borderTopLeftRadius:12,
                    borderTopRightRadius:12,
                    paddingBottom:3,
                    paddingTop:3
                    }}>
                <Text style={[styles.labelstyle,lstyle]}>{this.state.labelx}</Text>
            </View>
            
        )
    }

    
    body(){
        let valuesize = this.props.valuesize || 15

        const vstyle ={
            fontSize: valuesize,
            color: "#0070C0"
        }

        const vcontent ={
            flexDirection:'row',  
            justifyContent:'center',
            borderBottomRightRadius:8,
            borderBottomLeftRadius:8,
            paddingBottom:3,
            paddingTop:3,
            borderWidth:0.5,
            borderColor: 'grey'
            
            
        }

        if(this.props.children == undefined)
        {
            return (
                <View style={vcontent}>
                    <Text style={[styles.valuestyle,vstyle]}>{this.state.valuex}</Text>
                </View>
            )
        }
        else{
            return (
                <View style={vcontent}>
                    <View style={styles.childstyle}>{this.props.children}</View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.contentlv}>
                {this.header()}
                {this.body()}
                
            </View>
        );
       
    }
}


const styles = StyleSheet.create({
    contentlv:{
        flex: 0,
        flexDirection: 'column',
        marginBottom: 10

    },
    labelstyle:{
        //fontSize:16, 
        fontWeight:'bold' 
    },
    valuestyle:{
        //fontSize:15,
        paddingLeft: 5
    },
    childstyle:{
        flex:1
    }
})
export {Marquee}