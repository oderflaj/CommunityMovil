import React from 'react';
import { Button, Text, View } from 'react-native';
import {
    alarm,
    perfil,
    visita,
    aviso,
    areaComun,
    edoCuenta
} from './modules/Indexmodule';
import {DrawerNavigator} from 'react-navigation'
import MenuContent from './MenuContent' 

const Menu = DrawerNavigator(
    {
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
        AreaComun:{
            path:'/',
            screen: areaComun
        },
        EdoCuenta:{
            path:'/',
            screen: edoCuenta
        }
    },
    {
        initialRouteName:'Perfil',
        drawerPosition:'left',
        contentComponent: MenuContent
    }

);

export default Menu;