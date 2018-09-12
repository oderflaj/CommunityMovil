import React, {Component} from 'react'
import { View, Text, ScrollView, Image,StyleSheet} from 'react-native';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import Splash from './../Splash'

class visitaImagen extends Component{

    constructor(props){
        super(props);
        
        const {navigation} = {...this.props}
        const {header, idvisita} ={...navigation.state.params}

        //this.state = {load:true, propiedad:proper, visitas:undefined, date:cuFec, baseDate:cuFec, sw:false, ft:true, header:header, camaras:0};
        this.state = {
                        fotos:undefined, 
                        visitas:undefined,
                        idvisita:idvisita, 
                        navigation:navigation, 
                        visitante:undefined,
                        nombre:undefined,
                        domicilio:undefined,
                        marca:undefined,
                        modelo:undefined,
                        color:undefined,
                        placa:undefined
                    };
    }

    getImg(camara){

        if(!camara){
            return <Text>No se encontro imagen!</Text>
        }else{
            return <Image
                    style={{width: 300, height: 220}}
                    source={{uri: camara }}
                    />
        }
    }

    drawview(){
        if(this.state.visitante==undefined){
            return(
                <View style={{marginTop:40}}>
                    <Itemx.Spinner />
                </View>
            )
        }
        else{
            return(

                <View style={{flex:1, flexDirection:'column', padding:2, justifyContent: 'space-between'}}>
                    <Itemx.Marquee labelx={`${this.state.visitante.visitas.domicilio}`} >
                        <View style={{flex:1, flexDirection:'column', padding:10, justifyContent: 'space-between'}}>
                            <View style={{justifyContent:'center', flexDirection:'row', paddingLeft:5}}>
                                <Text style={{fontWeight:'bold', fontSize:17, color:'#00006f'}}>{this.state.visitante.visitas.nombre}</Text>
                            </View>
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                    <View>
                                        <Itemx.LabelValue labelx='MARCA' valuex={this.state.visitante.visitas.marca}/>
                                    </View>
                                    <View>
                                        <Itemx.LabelValue labelx='MODELO' valuex={this.state.visitante.visitas.submarca}/>
                                    </View>
                            </View>
                            <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                    <View>
                                        <Itemx.LabelValue labelx='COLOR' valuex={this.state.visitante.visitas.color}/>
                                    </View>
                                    <View>
                                        <Itemx.LabelValue labelx='PLACA' valuex={this.state.visitante.visitas.placa}/>
                                    </View>
                            </View>
                        </View>
                    </Itemx.Marquee>
                    <Itemx.Marquee labelx={`CONDUCTOR`} >
                        <View style={stVisitaImagen.contentImage}>
                            {this.getImg(this.state.visitante.visitas.camara1)} 
                        </View>
                        
                    </Itemx.Marquee>
                    <Itemx.Marquee labelx={`IDENTIFICACION`} >
                        <View style={stVisitaImagen.contentImage}>
                            {this.getImg(this.state.visitante.visitas.camara2)}
                        </View>
                    </Itemx.Marquee>
                    <Itemx.Marquee labelx={`PLACA`} >
                        <View style={stVisitaImagen.contentImage}>
                            {this.getImg(this.state.visitante.visitas.camara3)}
                        </View>
                    </Itemx.Marquee>
                </View>
            )
            
        }

    }

    render(){
        
        if(this.state.visitante==undefined)
        {
            RestOp.getCommunity("fotos",this.state.idvisita).then(visita=>{
                //console.debug(`Se obtuvo el siguiente valor-visita-->>>${JSON.stringify(visita.visitas)}`)
                this.setState({visitante: visita})       
            })
            return(<Splash/>)
        }
        else{
            if(this.state.visitante.visitas==null)
            {
                return(
                    <Itemx.Canvas>
                        <Itemx.Header navigation={this.state.navigation} nameHeader="Imagen Visitante" iconHeader="wc" menuDirection='back' menuItem='Visita' />
                        <Itemx.Context>
                            <ScrollView>
                                <Text>Error al obtener las imagenes del visitante; intententelo mas tarde.</Text>
                            </ScrollView>
                        </Itemx.Context>
                    </Itemx.Canvas>
                )
            }
            else{

                

                
                //Hay que meter validación de como es que se debe manejar cuando no se encuentra ningun valor, no olvidar que se debe de a 
                //manejar a las visitas que no tienen foto
                return(
                    <Itemx.Canvas>
                        <Itemx.Header navigation={this.state.navigation} nameHeader="Imagen Visitante" iconHeader="wc" menuDirection='back' menuItem='Visita' />
                        <Itemx.Context>
                            <ScrollView>
                                {this.drawview()}

                            </ScrollView>
                        </Itemx.Context>
                    </Itemx.Canvas>
                )
            }

            

        }
    }
}
const stVisitaImagen = StyleSheet.create({
    contentImage:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        margin: 30

    }
})

export {visitaImagen}