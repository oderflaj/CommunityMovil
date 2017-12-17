import React, {Component} from 'react';
import { View,Text,TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {DrawerNavigator} from 'react-navigation'

let frameX=undefined
let selectx = ''
let flag = 0

class MenuItem extends Component{
    constructor(props){
        super(props);
        this.state = {onPressItem,iconMenu,textMenu,onSelected,frameUse:undefined} = {...props};
        this.frameX = styles.frame
        AsyncStorage.getItem('menuItemSelected').then(item=>{
            
            console.log("componentWillMount ----Seleccionado Item->",item," Select>",this.state.onSelected)
            if(item != this.state.onSelected)
            {
                this.frameX = styles.frame
                console.log("componentWillMount if")
                
            }
            else
            {
                this.frameX = styles.frameOn
                console.log("componentWillMount else")
            }
            
            
        })
        
    }

    async componentWillMount(){

    }

    async componentWillUpdate(){
 
        await AsyncStorage.getItem('menuItemSelected').then(itemm=>{
            console.log(">>>Seleccionado Itemm->",itemm," Select>",this.state.onSelected)
            if(itemm != this.state.onSelected)
            {
                this.frameX = styles.frame
                console.log("ENTRA")
                
            }
            
            
        })    
    }

    async setSelected(){
        console.log("Guardara>",this.state.onSelected)
        await AsyncStorage.setItem('menuItemSelected',this.state.onSelected) 
        
        selectx = this.state.onSelected
    }

    

    
    render(){
        console.log(this.frameX, "->", selectx, "->", this.state.onSelected)
        if( selectx == this.state.onSelected )
        {
            this.frameX = styles.frame
        }
        if(selectx =='' && this.state.onSelected == 'Alarma' && flag == 0)
        {
            this.frameX = styles.frameOn
            flag++
        }
        return(
            
            <TouchableHighlight onPress={()=>{
                //console.log("Presiono boton xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->",this.state.onSelected)
                this.setSelected()
                this.frameX = styles.frameOn
                this.state.onPressItem()
                }} underlayColor='#1E282C'>
                <View style={this.frameX}>
                    <View style={{flexDirection:'row'}}>
                        <Icon color="grey" name={this.state.iconMenu} size={25} style={{marginRight: 20}}/>
                        <Text style={styles.textItem}>{this.state.textMenu}</Text>
                    </View>
                </View>
            </TouchableHighlight>
            
        );
    }
}

    

    


const styles = StyleSheet.create({
    frame:{
        borderBottomColor:"grey",
        borderBottomWidth:0.5,
        marginLeft: 3,
        marginRight: 3,
        padding: 10
    },
    frameOn:{
        borderBottomColor:"#2C3B41",
        borderBottomWidth:0.8,
        borderLeftColor:"#C7565A",
        borderLeftWidth:5,
        // marginLeft: 3,
        marginRight: 3,
        padding: 10,
        backgroundColor: '#000'
    },
    textItem:{
        fontSize: 18,
        color: "grey"
    }
});


export {MenuItem};