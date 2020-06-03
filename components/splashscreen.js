import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.imgView }>
        <Image
            source = { require("../assets/icons/splash.png") }
            style={ styles.img }/>
        </View>
            <Text style={ styles.title }>CORONA TRACKER</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
    },
    imgView: {
        height: '50%',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60
    },
    img: {
        resizeMode: 'center'
    },
    title: {
            fontSize: width*0.080,
            fontFamily: 'LexendDeca-Regular',
            color: '#424242'
    }
})