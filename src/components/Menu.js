import React , {Component} from 'react';
import { Button, Text, View, AsyncStorage } from 'react-native';
import alarm from './modules/Alarm';
import {
    //alarm,
    perfil,
    visita,
    aviso,
    areaComun,
    edoCuenta,
    propiedad,
    pagodetalle,
    VisitaDetalle,
    visitaImagen,
    avisoDetalle,
    edoCuentaDetalle
} from './modules/Indexmodule';
import {DrawerNavigator} from 'react-navigation'
import MenuContent from './MenuContent' 
import Login from './Login'

/*
const primera = async ()=>{
    let x = await AsyncStorage.getItem('menuItemSelected')
    console.debug(`XXXXXXXXXXXXXXXXXXXXYYYY----${x}----YYYYYYYYYYYYZZZZZZZZZZZZZZZZZZZZZZZZ`)
};

primera();*/

const Menu = DrawerNavigator(
    {
        Login:{
            path:'/',
            screen: Login
        },
        Alarma:{
            path:'/',
            screen: alarm
        },
        Perfil:{
            path:'/',
            screen: perfil
        },
        Visita:{
            path:'/',
            screen: visita
        },
        Aviso:{
            path:'/',
            screen: aviso
        },
        // AreaComun:{
        //     path:'/',
        //     screen: areaComun
        // },
        EdoCuenta:{
            path:'/',
            screen: edoCuenta
        },
        EdoCuentaDetalle:{
            path:'/',
            screen: edoCuentaDetalle
        },         
        Propiedad:{
            path:'/',
            screen: propiedad
        },        
        PagoDetalle:{
            path:'/',
            screen: pagodetalle
        },      
        VisitaDetalle:{
            path:'/',
            screen: VisitaDetalle
        },      
        VisitaImagen:{
            path:'/',
            screen: visitaImagen
        },      
        AvisoDetalle:{
            path:'/',
            screen: avisoDetalle
        }
    },
    {
        initialRouteName:'Alarma',
        drawerPosition:'left',
        contentComponent: MenuContent
    }

);

export default Menu;