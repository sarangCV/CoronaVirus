import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import Card from './card';
import Icon from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from './splashscreen';
import moment from 'moment';
import 'moment-timezone';
import {themes} from '../constants/color';
import AsyncStorage from '@react-native-community/async-storage';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kerala: [ ],
      districtData: { Kasaragod: {delta:{}},
                      Kannur: {delta:{}},
                      Kozhikode: {delta:{}},
                      Wayanad: {delta:{}},
                      Malappuram: {delta:{}},
                      Palakkad: {delta:{}},
                      Thrissur: {delta:{}},
                      Idukki: {delta:{}},
                      Ernakulam: {delta:{}},
                      Kottayam: {delta:{}},
                      Alappuzha: {delta:{}},
                      Pathanamthitta: {delta:{}},
                      Kollam: {delta:{}},
                      Thiruvananthapuram: {delta:{}}
                    },


      curDate: new Date().toDateString(),
      lastupdatedtime: null,
      isLoading: true,
      theme: themes.light,
      themeIconColor: 'dark',
      isAnimate: true,
      position1: new Animated.Value(20),
      opacity1: new Animated.Value(0),
      position2: new Animated.Value(-20),
      opacity2: new Animated.Value(0),
      position3: new Animated.Value(20),
      opacity3: new Animated.Value(0),
      position4: new Animated.Value(20),
      opacity4: new Animated.Value(0)
    };
  }

   componentDidMount() {
    this.fetchData();
}

animationHandler = () => {
  console.log("animation started")

  Animated.timing(this.state.position1, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start()

  Animated.timing(this.state.opacity1, {
    toValue: 1,
    duration: 600,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.position2, {
    toValue: 0,
    duration: 350,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.opacity2, {
    toValue: 1,
    duration: 700,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.position3, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.opacity3, {
    toValue: 1,
    duration: 800,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.position4, {
    toValue: 0,
    duration: 450,
    useNativeDriver: false
  }).start()

  Animated.timing(this.state.opacity4, {
    toValue: 1,
    duration: 900,
    useNativeDriver: false
  }).start()

}

  themeHandler = async () => {
    if(this.state.theme == themes.light){
      await AsyncStorage.setItem('theme', 'dark');
      this.setState({
        theme: themes.dark,
        themeIconColor: 'light'
      })}
    else {
      await AsyncStorage.setItem('theme', 'light');
      this.setState({
        theme: themes.light,
        themeIconColor: 'dark'
      })
    }
    

  }

  fetchData = async ()  => {
    const theme = await AsyncStorage.getItem('theme')

      if (theme == 'light') {
            this.setState({
              theme: themes.light,
            })
          }
          else {
            this.setState({
              theme: themes.dark,
            })
          }

    fetch('https://api.covid19india.org/state_district_wise.json')
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        districtData: responseJson.Kerala.districtData
      })
    })

    fetch('https://api.covid19india.org/data.json')
    .then(response => response.json())
    .then((responseJson) => {
      const filteredData = responseJson.statewise.filter((item) => {
        return(item.state === 'Kerala')
      })
      
      this.setState({
        kerala: filteredData[0],
        lastupdatedtime: moment(`${filteredData[0].lastupdatedtime}`, "DD/MM/YYYY hh:mm:ss").utcOffset("+05:30").fromNow(),
        isLoading: false
      })
      console.log(this.state.kerala)
    })
    await AsyncStorage.removeItem('theme')
  }

  render() {
    // console.log(this.state.Kerala.lastupdatedtime)

    if(this.state.isLoading) {
        return(
            <SplashScreen/>
        );
    }else
    {
      setTimeout(() => {
        this.animationHandler()
      }, 1000);
        return(
          
        <View style = {{...styles.container, backgroundColor: this.state.theme.primary}}>
              <View style = { styles.header }>          
                  <Text style = { {...styles.title, color: `${this.state.theme.accent}`} }>Covid19 Kerala</Text>
                  <View style = { styles.date }>
                    <Text style = { {...styles.dateAndTime, color: `${this.state.theme.accent}`} }>{this.state.curDate}</Text>
                  </View>
              </View>

            <View style = { styles.body }>          
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View style = { styles.totalView }>
                  <View style={ styles.themeView }>
                        <Ico name = 'theme-light-dark' size = {30} style={{marginRight: 5}} color = {`${this.state.theme.themeIconColor}`} onPress = { this.themeHandler }/>
                  </View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position1, opacity: this.state.opacity1} } >
                      <Text style={ styles.totalActiveText }>Active : {this.state.kerala.active}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position2, opacity: this.state.opacity2} }>
                      <Text style={ styles.totalConfirmedText }>Confirmed : {this.state.kerala.confirmed}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#ff073a' style={{marginRight: 5}}/><Text style={ styles.totalConfirmedTextNew }>{ this.state.kerala.deltaconfirmed}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position3, opacity: this.state.opacity3} }>
                      <Text style={ styles.totalRecoveredText }>Recovered : {this.state.kerala.recovered}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#33691E' style={{marginRight: 5}}/><Text style={ styles.totalRecoveredTextNew }>{ this.state.kerala.deltarecovered}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position4, opacity: this.state.opacity4} }>
                      <Text style={ styles.totalDeceasedText }>Deceased : {this.state.kerala.deaths}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#6d8089' style={{marginRight: 5}}/><Text style={ styles.totalDeceasedTextNew }>{ this.state.kerala.deltadeaths}</Text>
                  </Animated.View>
                  <View style={ styles.totalActiveView }>
                    <Text style={ styles.lastupdatedtime }>Last updated time : {this.state.lastupdatedtime} </Text>
                  </View>
                </View>

                <Card
                district = "Kasaragod"
                active = { this.state.districtData.Kasaragod.active }
                confirmed = { this.state.districtData.Kasaragod.confirmed }
                recovered = { this.state.districtData.Kasaragod.recovered }
                deceased = { this.state.districtData.Kasaragod.deceased }
                deltaConfirmed = { this.state.districtData.Kasaragod.delta.confirmed }
                deltaRecovered = { this.state.districtData.Kasaragod.delta.recovered }
                deltaDeceased = { this.state.districtData.Kasaragod.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}
                />

                <Card
                district = "Kannur"
                active = { this.state.districtData.Kannur.active }
                confirmed = { this.state.districtData.Kannur.confirmed }
                recovered = { this.state.districtData.Kannur.recovered }
                deceased = { this.state.districtData.Kannur.deceased }
                deltaConfirmed = { this.state.districtData.Kannur.delta.confirmed }
                deltaRecovered = { this.state.districtData.Kannur.delta.recovered }
                deltaDeceased = { this.state.districtData.Kannur.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Kozhikode"
                active = { this.state.districtData.Kozhikode.active }
                confirmed = { this.state.districtData.Kozhikode.confirmed }
                recovered = { this.state.districtData.Kozhikode.recovered }
                deceased = { this.state.districtData.Kozhikode.deceased }
                deltaConfirmed = { this.state.districtData.Kozhikode.delta.confirmed }
                deltaRecovered = { this.state.districtData.Kozhikode.delta.recovered }
                deltaDeceased = { this.state.districtData.Kozhikode.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Wayanad"
                active = { this.state.districtData.Wayanad.active }
                confirmed = { this.state.districtData.Wayanad.confirmed }
                recovered = { this.state.districtData.Wayanad.recovered }
                deceased = { this.state.districtData.Wayanad.deceased }
                deltaConfirmed = { this.state.districtData.Wayanad.delta.confirmed }
                deltaRecovered = { this.state.districtData.Wayanad.delta.recovered }
                deltaDeceased = { this.state.districtData.Wayanad.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Malappuram"
                active = { this.state.districtData.Malappuram.active }
                confirmed = { this.state.districtData.Malappuram.confirmed }
                recovered = { this.state.districtData.Malappuram.recovered }
                deceased = { this.state.districtData.Malappuram.deceased }
                deltaConfirmed = { this.state.districtData.Malappuram.delta.confirmed }
                deltaRecovered = { this.state.districtData.Malappuram.delta.recovered }
                deltaDeceased = { this.state.districtData.Malappuram.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Palakkad"
                active = { this.state.districtData.Palakkad.active }
                confirmed = { this.state.districtData.Palakkad.confirmed }
                recovered = { this.state.districtData.Palakkad.recovered }
                deceased = { this.state.districtData.Palakkad.deceased }
                deltaConfirmed = { this.state.districtData.Palakkad.delta.confirmed }
                deltaRecovered = { this.state.districtData.Palakkad.delta.recovered }
                deltaDeceased = { this.state.districtData.Palakkad.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Thrissur"
                active = { this.state.districtData.Thrissur.active }
                confirmed = { this.state.districtData.Thrissur.confirmed }
                recovered = { this.state.districtData.Thrissur.recovered }
                deceased = { this.state.districtData.Thrissur.deceased }
                deltaConfirmed = { this.state.districtData.Thrissur.delta.confirmed }
                deltaRecovered = { this.state.districtData.Thrissur.delta.recovered }
                deltaDeceased = { this.state.districtData.Thrissur.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Idukki"
                active = { this.state.districtData.Idukki.active }
                confirmed = { this.state.districtData.Idukki.confirmed }
                recovered = { this.state.districtData.Idukki.recovered }
                deceased = { this.state.districtData.Idukki.deceased }
                deltaConfirmed = { this.state.districtData.Idukki.delta.confirmed }
                deltaRecovered = { this.state.districtData.Idukki.delta.recovered }
                deltaDeceased = { this.state.districtData.Idukki.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Ernakulam"
                active = { this.state.districtData.Ernakulam.active }
                confirmed = { this.state.districtData.Ernakulam.confirmed }
                recovered = { this.state.districtData.Ernakulam.recovered }
                deceased = { this.state.districtData.Ernakulam.deceased }
                deltaConfirmed = { this.state.districtData.Ernakulam.delta.confirmed }
                deltaRecovered = { this.state.districtData.Ernakulam.delta.recovered }
                deltaDeceased = { this.state.districtData.Ernakulam.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>
                <Card
                district = "Kottayam"
                active = { this.state.districtData.Kottayam.active }
                confirmed = { this.state.districtData.Kottayam.confirmed }
                recovered = { this.state.districtData.Kottayam.recovered }
                deceased = { this.state.districtData.Kottayam.deceased }
                deltaConfirmed = { this.state.districtData.Kottayam.delta.confirmed }
                deltaRecovered = { this.state.districtData.Kottayam.delta.recovered }
                deltaDeceased = { this.state.districtData.Kottayam.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Alappuzha"
                active = { this.state.districtData.Alappuzha.active }
                confirmed = { this.state.districtData.Alappuzha.confirmed }
                recovered = { this.state.districtData.Alappuzha.recovered }
                deceased = { this.state.districtData.Alappuzha.deceased }
                deltaConfirmed = { this.state.districtData.Alappuzha.delta.confirmed }
                deltaRecovered = { this.state.districtData.Alappuzha.delta.recovered }
                deltaDeceased = { this.state.districtData.Alappuzha.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Pathanamthitta"
                active = { this.state.districtData.Pathanamthitta.active }
                confirmed = { this.state.districtData.Pathanamthitta.confirmed }
                recovered = { this.state.districtData.Pathanamthitta.recovered }
                deceased = { this.state.districtData.Pathanamthitta.deceased }
                deltaConfirmed = { this.state.districtData.Pathanamthitta.delta.confirmed }
                deltaRecovered = { this.state.districtData.Pathanamthitta.delta.recovered }
                deltaDeceased = { this.state.districtData.Pathanamthitta.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Kollam"
                active = { this.state.districtData.Kollam.active }
                confirmed = { this.state.districtData.Kollam.confirmed }
                recovered = { this.state.districtData.Kollam.recovered }
                deceased = { this.state.districtData.Kollam.deceased }
                deltaConfirmed = { this.state.districtData.Kollam.delta.confirmed }
                deltaRecovered = { this.state.districtData.Kollam.delta.recovered }
                deltaDeceased = { this.state.districtData.Kollam.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Thiruvananthapuram"
                active = { this.state.districtData.Thiruvananthapuram.active }
                confirmed = { this.state.districtData.Thiruvananthapuram.confirmed }
                recovered = { this.state.districtData.Thiruvananthapuram.recovered }
                deceased = { this.state.districtData.Thiruvananthapuram.deceased }
                deltaConfirmed = { this.state.districtData.Thiruvananthapuram.delta.confirmed }
                deltaRecovered = { this.state.districtData.Thiruvananthapuram.delta.recovered }
                deltaDeceased = { this.state.districtData.Thiruvananthapuram.delta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>
                
            </ScrollView>
            </View>

        </View>
        )
    }

  }
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: height*0.08,
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  date: {
    height: '100%',
    width: width*0.4,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  dateAndTime: {
    fontSize: width*0.032,
    fontFamily: 'LexendDeca-Regular'
  },
  body: {
    width: '100%',
    height: '100%',
    paddingTop: height*0.09,
    alignItems: 'center'
  },
  totalView: {
    height: height*0.32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeView: {
    position: 'absolute',
    width: '15%',
    height: '15%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    bottom: '85%',
  },
  totalActiveView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  totalActiveText: {
    fontSize: width*0.075,
    fontFamily: 'LexendDeca-Regular',
    color: '#3F51B5',
  },
  totalConfirmedText: {
    fontSize: width*0.075,
    fontFamily: 'LexendDeca-Regular',
    color: '#ff073a',
    marginRight: 5
  },
  totalRecoveredText: {
    fontSize: width*0.075,
    fontFamily: 'LexendDeca-Regular',
    color: '#33691E',
    marginRight: 5
  },
  totalDeceasedText: {
    fontSize: width*0.075,
    fontFamily: 'LexendDeca-Regular',
    color: '#6d8089',
    marginRight: 5
  },
  totalConfirmedTextNew: {
    fontSize: width*0.045,
    fontFamily: 'OpenSans-Regular',
    color: '#ff073a',
    marginRight: 5
  },
  totalRecoveredTextNew: {
    fontSize: width*0.045,
    fontFamily: 'OpenSans-Regular',
    color: '#33691E',
    marginRight: 5
  },
  totalDeceasedTextNew: {
    fontSize: width*0.045,
    fontFamily: 'OpenSans-Regular',
    color: '#6d8089',
    marginRight: 5
  },
  lastupdatedtime: {
    fontSize: width*0.032,
    fontFamily: 'OpenSans-Regular',
    color: '#33691E',
  },
  title: {
    fontSize: width*0.050,
    fontFamily: 'LexendDeca-Regular',
  }
})
