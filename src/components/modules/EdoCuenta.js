import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Itemx from './../items/IndexItem'
import * as RestOp from './../functions/RestFunctions';
import * as MisFun from './../functions/MiscFunctions';
import Splash from './../Splash'

class edoCuenta extends Component {

  constructor(props){
    super(props);
    console.debug(props)
    var d = new Date();
    var n = d.getFullYear();
    var m = d.getMonth()+1
    var mm = (m<10?`0${m}`:m)
    
    this.state = {periodos:undefined, periodox:undefined, año:n, mes:mm, host:undefined,token:undefined};
  }

  async componentWillMount() {
    await RestOp.getCommunity("edoctaperiodos").then(res=>{
      console.log(res)
      this.setState({periodos:res.periodos})
  })
  }

  showYears(){

    let meses = this.state.periodos

    let periodo = meses.map((p)=>{
      return {year:p.toString().substring(0,4),month:p.toString().substring(4,6)}
    })

    let yrs = periodo.map((y)=>y.year)
    
    let yr = [...new Set(yrs)]

    yr = yr.sort((a,b)=>b-a)

    return yr.map((y)=><Picker.Item key={y} label={y} value={y} />)
  }

  showMonths(){

    let periodos = this.state.periodos
    
    let meses = periodos.map((p)=>{
      return {year:p.toString().substring(0,4),month:p.toString().substring(4,6)}
    })

    let mesx = meses.filter(o=>o.year==this.state.año) //[{"year":"2018","month":"03"},{"year":"2018","month":"02"},{"year":"2018","month":"01"},{"year":"2017","month":"12"},{"year":"2017","month":"11"},{"year":"2017","month":"10"},{"year":"2017","month":"09"},{"year":"2017","month":"08"},{"year":"2017","month":"07"},{"year":"2017","month":"06"},{"year":"2017","month":"05"},{"year":"2017","month":"04"},{"year":"2017","month":"03"},{"year":"2017","month":"02"},{"year":"2017","month":"01"},{"year":"2016","month":"12"},{"year":"2016","month":"11"},{"year":"2016","month":"10"},{"year":"2016","month":"09"},{"year":"2016","month":"08"},{"year":"2016","month":"07"},{"year":"2016","month":"06"},{"year":"2016","month":"05"}]
    //meses.filter(o=>o.year=="2018")

    let mesy = mesx.map(m=>m.month)

    mesy = mesy.sort((a,b)=>b-a)

    return(mesy.map(m=><Picker.Item key={m} label={ MisFun.getMonthNameNumber(m).toUpperCase()} value={m} />))
     
  }

  consultaEdocta(){
    let periodo = `${this.state.año}${this.state.mes}`

    this.props.navigation.navigate('EdoCuentaDetalle',{periodo:periodo})

  }

  render() {

    if(this.state.periodos==undefined)
    {
      return(<Splash/>)
    }
    else
    {
      let navigate = this.props.navigation;
      return (
        
        <Itemx.Canvas>
          <Itemx.Header navigation={navigate} nameHeader="Estado Cuenta" iconHeader="confirmation-number"/>
          <Itemx.Context>
            <View>
              <Text>Seleccione el Año y el Mes del estado de cuenta y presione el botón Consultar</Text>
              <Itemx.LabelValue labelx={'Año'}>
              <Picker
                selectedValue={this.state.año}
                onValueChange={(itemValue, itemIndex) => this.setState({año: itemValue})}>
                {this.showYears()}
              </Picker>
                </Itemx.LabelValue>
              </View>
              <View>
                <Itemx.LabelValue labelx={'Mes'}>
                  <Picker
                      selectedValue={this.state.mes}
                      onValueChange={(itemValue, itemIndex) => this.setState({mes: itemValue})}>
                    {this.showMonths()}
                  </Picker>
                </Itemx.LabelValue>
              </View>
              <View>
                <Itemx.BigButton onPress={this.consultaEdocta.bind(this)} >
                  {/* <View style={{flexDirection:'row', }}>
                    <View>
                      <Icon color='#fff' name='filter-none' size={20} />
                      </View>
                      <View >
                        <Text style={{color:'#fff', fontSize:20}}>CONSULTAR</Text>
                      </View>
                    </View> */}
                    CONSULTAR
                </Itemx.BigButton >
              </View>
            </Itemx.Context>
          </Itemx.Canvas>
        
      );
    }
  }
}

export {edoCuenta}