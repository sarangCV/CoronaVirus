import React, { Component, Children } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style = { styles.cardView }>

          <View style={ {...styles.header, ...this.props.color} }>
            <Text style={ {...styles.title, ...this.props.textColor} }>{ this.props.district }</Text>
          </View>
          <View style={ {...styles.body, ...this.props.color} }>
            <View style={ styles.confirmedView }>
                <Text style={ styles.bodyText2 }>confirmed : { this.props.confirmed }</Text><Icon name = 'md-arrow-round-up' size = {15} color = '#B71C1C' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew1 }>{ this.props.deltaConfirmed }</Text>
            </View>
            <Text style={ styles.bodyText1 }>active : { this.props.active }</Text>
            <View style={ styles.confirmedView }>
                <Text style={ styles.bodyText3 }>recovered : { this.props.recovered }</Text><Icon name = 'md-arrow-round-up' size = {15} color = '#388E3C' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew2 }>{ this.props.deltaRecovered }</Text>
            </View>
            <View style={ styles.confirmedView }>
                <Text style={ styles.bodyText4 }>deceased : { this.props.deceased }</Text><Icon name = 'md-arrow-round-up' size = {15} color = '#607D8B' style={{marginRight: 5}}/><Text style={ styles.bodyTextNew3 }>{ this.props.deltaDeceased }</Text>
            </View>
          </View>
          
        </View>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
    cardView: {
        height: height*0.20,
        width: width*0.95,
        flexDirection: 'column',
        marginBottom: 8,
        borderRadius: 10,
        padding: 5,
        

    },
    header: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 1,

    },
    title: {
        fontSize: width*0.044,
        fontFamily: 'LexendDeca-Regular'
    },
    body: {
        height: '80%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        elevation: 1,

        
    },
    bodyText1: {
      fontSize: width*0.0375,
      fontFamily: 'OpenSans-Regular',
      color: '#3F51B5',
    },
    confirmedView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyText2: {
      fontSize: width*0.0375,
      fontFamily: 'OpenSans-Regular',
      color: '#B71C1C',
      marginRight: 5

    },
    bodyText3: {
        fontSize: width*0.0375,
        fontFamily: 'OpenSans-Regular',
      color: '#388E3C',
      marginRight: 5

    },
   bodyText4: {
    fontSize: width*0.0375,
    fontFamily: 'OpenSans-Regular',
      color: '#607D8B',
      marginRight: 5
    },
    bodyTextNew1: {
        fontSize: width*0.030,
        color: '#B71C1C',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    },
    bodyTextNew2: {
        fontSize: width*0.030,
        color: '#388E3C',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    },
    bodyTextNew3: {
        fontSize: width*0.030,
        color: '#607D8B',
        marginRight: 5,
        fontFamily: 'LexendDeca-Regular',

    }
    
})
