import React, { Component } from 'react';
import {  AppRegistry, 
          View, 
          Text,
          Image,
          StyleSheet,
          AsyncStorage
        } from 'react-native';
import BasePage from './src/components/BasePage';
import * as RestOp from './src/components/functions/RestFunctions';

export default class App extends React.Component {
  render() {
    return (
      <BasePage/>
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
