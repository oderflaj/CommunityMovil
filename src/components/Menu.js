import React from 'react';
import { Button, Text, View } from 'react-native';
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
    avisoDetalle
} from './modules/Indexmodule';
import {DrawerNavigator} from 'react-navigation'
import MenuContent from './MenuContent' 
import Login from './Login'

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