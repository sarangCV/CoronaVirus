import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './splashscreen';
import Home from './home';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    };
  }

  isLoading = (loadingState) => {
    this.setState({isLoading: loadingState})
  }

  render() {
      if(this.state.isLoading) {
          return(
              <SplashScreen/>
          )
      }
      else {
          return(
              <Home isLoading = { this.isLoading }/>
          )
      }
  }
}
