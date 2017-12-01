import React from 'react';
import { Button, Text, View } from 'react-native';
import {
    alarm
} from './modules/Indexmodule';
import {DrawerNavigator} from 'react-navigation'
import MenuContent from './MenuContent' 

const Menu = DrawerNavigator(
    {
        Alarma:{
            path:'/',
            screen: alarm
        }
    },
    {
        initialRouteName:'Alarma',
        drawerPosition:'left',
        contentComponent: MenuContent
    }

);

export default Menu;