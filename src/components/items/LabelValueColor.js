import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



//const LabelValueColor = ({statusname,textlabel,textvalue,iconshow,colorshow,iconsize,textsize, itemValue, heightstatus}) => {
class LabelValueColor extends Component { 
    constructor(props){
        super(props);
        this.state = {}
    }

    setValue(itemValue){
        console.log("Devuelve algo",itemValue)
        if(itemValue==undefined || itemValue != true){
            return(<View></View>)
        }
    
        return(
            <View style={{alignSelf:'center'}}>
                {this.props.children}
            </View>
        )
    }

    render(){
        
        let {statusname,textlabel,textvalue, itemValue, iconshow,colorshow,iconsize,textsize,  heightstatus} = {...this.props}
        let factor =  7
        console.log("-------->>>>>>>>",itemValue)
        if(textsize != undefined)
        {
            factor = (textsize * 7) / 11
        }
        itemValue = itemValue || false
        iconsize = iconsize || 30
        textsize = textsize || 22
        heightstatus = heightstatus || 60

        switch(statusname){
            case "success":
                return(
                    <View style={{
                        flexDirection:'row',
                        backgroundColor:'#DFF0D8',
                        borderColor:'#D6E9C6',
                        borderWidth:1,
                        paddingBottom: 1,
                        paddingTop: 1,
                        paddingLeft:10,
                    paddingRight:3,
                    height:heightstatus
                }}>
                    <View style={{alignSelf:'center'}}>
                        <Icon color='#3C763D' name={iconshow} size={iconsize} /> 
                    </View>
                    <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{
                                color:'#3C763D',
                                fontWeight:'bold',
                                fontSize:textsize
                            }}>
                                {textlabel}
                            </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.setValue(itemValue)}
                            <Text style={{
                                color:'#3C763D',
                                fontSize:textsize
                            }}>
                                {textvalue}
                            </Text>
                        </View>
                    </View>
                </View>
            )
            break;
        case "info":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#D9EDF7',
                    borderColor:'#BCE8F1',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:10,
                    paddingRight:3,
                    height:heightstatus
                }}>
                    <View style={{alignSelf:'center'}}>
                        <Icon color='#31708F' name={iconshow} size={iconsize} /> 
                    </View>
                    <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{
                                color:'#31708F',
                                fontWeight:'bold',
                                fontSize:textsize
                            }}>
                                {textlabel}
                            </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.setValue(itemValue)}
                            <Text style={{
                                color:'#31708F',
                                fontSize:textsize
                            }}>
                                {textvalue}
                            </Text>
                        </View>
                    </View>
                </View>
                
            )
            break;
        case "warning":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#FCF8E3',
                    borderColor:'#FAEBCC',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:10,
                    paddingRight:3,
                    height:heightstatus
                }}>
                    <View style={{alignSelf:'center'}}>
                        <Icon color='#8A6D3B' name={iconshow} size={iconsize} /> 
                    </View>
                    <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{
                                color:'#8A6D3B',
                                fontWeight:'bold',
                                fontSize:textsize
                            }}>
                                {textlabel}
                            </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.setValue(itemValue)}
                            <Text style={{
                                color:'#8A6D3B',
                                fontSize:textsize
                            }}>
                                {textvalue}
                            </Text>
                        </View>
                    </View>
                </View>
            )
            break;
        case "danger":
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:'#F2DEDE',
                    borderColor:'#EBCCD1',
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:10,
                    paddingRight:3,
                    height:heightstatus
                }}>
                    <View style={{alignSelf:'center'}}>
                        <Icon color='#A94442' name={iconshow} size={iconsize} /> 
                    </View>
                    <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{
                                color:'#A94442',
                                fontWeight:'bold',
                                fontSize:textsize
                            }}>
                                {textlabel}
                            </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.setValue(itemValue)}
                            <Text style={{
                                color:'#A94442',
                                fontSize:textsize
                            }}>
                                {textvalue}
                            </Text>
                        </View>
                    </View>
                </View>
            )
            break;
        default:
            return(
                <View style={{
                    flexDirection:'row',
                    backgroundColor:colorshow,
                    borderWidth:1,
                    paddingBottom: 1,
                    paddingTop: 1,
                    paddingLeft:10,
                    paddingRight:3,
                    height:heightstatus
                }}>
                    <View style={{alignSelf:'center'}}>
                        <Icon color='#fff' name={iconshow} size={iconsize} /> 
                    </View>
                    <View style={{paddingLeft:5, flexDirection:'row', flex:1, justifyContent:'space-around'}}>
                        <View style={{alignSelf:'center'}}>
                            <Text style={{
                                color:'#fff',
                                fontWeight:'bold',
                                fontSize:textsize
                            }}>
                                {textlabel}
                            </Text>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.setValue(itemValue)}
                            <Text style={{
                                color:'#fff',

                                fontSize:textsize
                            }}>
                                {textvalue}
                            </Text>
                        </View>
                    </View>
                </View>
            )
            break;
    }
}

    
}

export {LabelValueColor}