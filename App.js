import React, { Component } from 'react';
import {  AppRegistry, 
          View, 
          Text,
          Image,
          StyleSheet,
          AsyncStorage
        } from 'react-native';
import BasePage from './src/components/BasePage';
//import * as RestOp from './src/components/functions/RestFunctions';

import { Provider } from 'react-redux';
import store from "./store"



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BasePage />
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
