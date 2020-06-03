import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, Animated, Easing } from 'react-native';
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
      Kerala: [],
      Alappuzha: [],
      AlappuzhaDelta: [],
      Ernakulam: [],
      ErnakulamDelta: [],
      Idukki: [],
      IdukkiDelta: [],
      Kannur: [],
      KannurDelta: [],
      Kasaragod: [],
      KasaragodDelta: [],
      Kollam: [],
      KollamDelta: [],
      Kottayam: [],
      KottayamDelta: [],
      Kozhikode: [],
      KozhikodeDelta: [],
      Malappuram: [],
      MalappuramDelta: [],
      Palakkad: [],
      PalakkadDelta: [],
      Pathanamthitta: [],
      PathanamthittaDelta: [],
      Thiruvananthapuram: [],
      ThiruvananthapuramDelta: [],
      Thrissur: [],
      ThrissurDelta: [],
      Wayanad: [],
      WayanadDelta: [],
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
    // this.setState({ isAnimate: false })

}

animationHandler = () => {
  // this.position1 = new Animated.Value(100);
  // this.opacity1 = new Animated.Value(0);
  // this.position2 = new Animated.Value(-100);
  // this.opacity2 = new Animated.Value(0);
  // this.position3 = new Animated.Value(100);
  // this.opacity3 = new Animated.Value(0);
  // this.position4 = new Animated.Value(100);
  // this.opacity4 = new Animated.Value(0);

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

// animationHandler2 = () => {
//   Animated.timing(this.position, {
//     toValue: 1,
//     duration: 2000
//   }).start
// }

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

  fetchData = async () => {
    const response = await fetch('https://api.covid19india.org/state_district_wise.json');
    const data = await response.json();
    const response2 = await fetch('https://api.covid19india.org/data.json');
    const data2 = await response2.json();
    // const Kerala = data2.statewise[19];
    const Kerala = data2.statewise.filter((item) => {
        return(item.state == 'Kerala')
    });
    const Alappuzha = data.Kerala.districtData.Alappuzha;
    const AlappuzhaDelta = data.Kerala.districtData.Alappuzha.delta;
    const Ernakulam = data.Kerala.districtData.Ernakulam;
    const ErnakulamDelta = data.Kerala.districtData.Ernakulam.delta;
    const Idukki = data.Kerala.districtData.Idukki;
    const IdukkiDelta = data.Kerala.districtData.Idukki.delta;
    const Kannur = data.Kerala.districtData.Kannur;
    const KannurDelta = data.Kerala.districtData.Kannur.delta;
    const Kasaragod = data.Kerala.districtData.Kasaragod;
    const KasaragodDelta = data.Kerala.districtData.Kasaragod.delta;
    const Kollam = data.Kerala.districtData.Kollam;
    const KollamDelta = data.Kerala.districtData.Kollam.delta;
    const Kottayam = data.Kerala.districtData.Kottayam;
    const KottayamDelta = data.Kerala.districtData.Kottayam.delta;
    const Kozhikode = data.Kerala.districtData.Kozhikode;
    const KozhikodeDelta = data.Kerala.districtData.Kozhikode.delta;
    const Malappuram = data.Kerala.districtData.Malappuram;
    const MalappuramDelta = data.Kerala.districtData.Malappuram.delta;
    const Palakkad = data.Kerala.districtData.Palakkad;
    const PalakkadDelta = data.Kerala.districtData.Palakkad.delta;
    const Pathanamthitta = data.Kerala.districtData.Pathanamthitta;
    const PathanamthittaDelta = data.Kerala.districtData.Pathanamthitta.delta;
    const Thiruvananthapuram = data.Kerala.districtData.Thiruvananthapuram;
    const ThiruvananthapuramDelta = data.Kerala.districtData.Thiruvananthapuram.delta;
    const Thrissur = data.Kerala.districtData.Thrissur;
    const ThrissurDelta = data.Kerala.districtData.Thrissur.delta;
    const Wayanad = data.Kerala.districtData.Wayanad;
    const WayanadDelta = data.Kerala.districtData.Wayanad.delta;
    const theme = await AsyncStorage.getItem('theme')
    console.log(theme)
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
    

    this.setState({
      Kerala: Kerala,
      Alappuzha: Alappuzha,
      AlappuzhaDelta: AlappuzhaDelta,
      Ernakulam: Ernakulam,
      ErnakulamDelta: ErnakulamDelta,
      Idukki: Idukki,
      IdukkiDelta: IdukkiDelta,
      Kannur: Kannur,
      KannurDelta: KannurDelta,
      Kasaragod: Kasaragod,
      KasaragodDelta: KasaragodDelta,
      Kollam: Kollam,
      KollamDelta: KollamDelta,
      Kottayam: Kottayam,
      KottayamDelta: KottayamDelta,
      Kozhikode: Kozhikode,
      KozhikodeDelta: KozhikodeDelta,
      Malappuram: Malappuram,
      MalappuramDelta: MalappuramDelta,
      Palakkad: Palakkad,
      PalakkadDelta: PalakkadDelta,
      Pathanamthitta: Pathanamthitta,
      PathanamthittaDelta: PathanamthittaDelta,
      Thiruvananthapuram: Thiruvananthapuram,
      ThiruvananthapuramDelta: ThiruvananthapuramDelta,
      Thrissur: Thrissur,
      ThrissurDelta: ThrissurDelta,
      Wayanad: Wayanad,
      WayanadDelta: WayanadDelta,
      lastupdatedtime: moment(`${Kerala[0].lastupdatedtime}`, "DD/MM/YYYY hh:mm:ss").utcOffset("+05:30").fromNow(),
      isLoading: false,

      })


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
                      <Text style={ styles.totalActiveText }>Active : {this.state.Kerala[0].active}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position2, opacity: this.state.opacity2} }>
                      <Text style={ styles.totalConfirmedText }>Confirmed : {this.state.Kerala[0].confirmed}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#ff073a' style={{marginRight: 5}}/><Text style={ styles.totalConfirmedTextNew }>{ this.state.Kerala[0].deltaconfirmed}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position3, opacity: this.state.opacity3} }>
                      <Text style={ styles.totalRecoveredText }>Recovered : {this.state.Kerala[0].recovered}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#33691E' style={{marginRight: 5}}/><Text style={ styles.totalRecoveredTextNew }>{ this.state.Kerala[0].deltarecovered}</Text>
                  </Animated.View>
                  <Animated.View style={ {...styles.totalActiveView, top: this.state.position4, opacity: this.state.opacity4} }>
                      <Text style={ styles.totalDeceasedText }>Deceased : {this.state.Kerala[0].deaths}</Text><Icon name = 'md-arrow-round-up' size = {22} color = '#455A64' style={{marginRight: 5}}/><Text style={ styles.totalDeceasedTextNew }>{ this.state.Kerala[0].deltadeaths}</Text>
                  </Animated.View>
                  <View style={ styles.totalActiveView }>
                    <Text style={ styles.lastupdatedtime }>Last updated time : {this.state.lastupdatedtime} </Text>
                  </View>
                </View>

                <Card
                district = "Kasaragod"
                active = { this.state.Kasaragod.active }
                confirmed = { this.state.Kasaragod.confirmed }
                recovered = { this.state.Kasaragod.recovered }
                deceased = { this.state.Kasaragod.deceased }
                deltaConfirmed = { this.state.KasaragodDelta.confirmed }
                deltaRecovered = { this.state.KasaragodDelta.recovered }
                deltaDeceased = { this.state.KasaragodDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Kannur"
                active = { this.state.Kannur.active }
                confirmed = { this.state.Kannur.confirmed }
                recovered = { this.state.Kannur.recovered }
                deceased = { this.state.Kannur.deceased }
                deltaConfirmed = { this.state.KannurDelta.confirmed }
                deltaRecovered = { this.state.KannurDelta.recovered }
                deltaDeceased = { this.state.KannurDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Kozhikode"
                active = { this.state.Kozhikode.active }
                confirmed = { this.state.Kozhikode.confirmed }
                recovered = { this.state.Kozhikode.recovered }
                deceased = { this.state.Kozhikode.deceased }
                deltaConfirmed = { this.state.KozhikodeDelta.confirmed }
                deltaRecovered = { this.state.KozhikodeDelta.recovered }
                deltaDeceased = { this.state.KozhikodeDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Wayanad"
                active = { this.state.Wayanad.active }
                confirmed = { this.state.Wayanad.confirmed }
                recovered = { this.state.Wayanad.recovered }
                deceased = { this.state.Wayanad.deceased }
                deltaConfirmed = { this.state.WayanadDelta.confirmed }
                deltaRecovered = { this.state.WayanadDelta.recovered }
                deltaDeceased = { this.state.WayanadDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Malappuram"
                active = { this.state.Malappuram.active }
                confirmed = { this.state.Malappuram.confirmed }
                recovered = { this.state.Malappuram.recovered }
                deceased = { this.state.Malappuram.deceased }
                deltaConfirmed = { this.state.MalappuramDelta.confirmed }
                deltaRecovered = { this.state.MalappuramDelta.recovered }
                deltaDeceased = { this.state.MalappuramDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Palakkad"
                active = { this.state.Palakkad.active }
                confirmed = { this.state.Palakkad.confirmed }
                recovered = { this.state.Palakkad.recovered }
                deceased = { this.state.Palakkad.deceased }
                deltaConfirmed = { this.state.PalakkadDelta.confirmed }
                deltaRecovered = { this.state.PalakkadDelta.recovered }
                deltaDeceased = { this.state.PalakkadDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Thrissur"
                active = { this.state.Thrissur.active }
                confirmed = { this.state.Thrissur.confirmed }
                recovered = { this.state.Thrissur.recovered }
                deceased = { this.state.Thrissur.deceased }
                deltaConfirmed = { this.state.ThrissurDelta.confirmed }
                deltaRecovered = { this.state.ThrissurDelta.recovered }
                deltaDeceased = { this.state.ThrissurDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Idukki"
                active = { this.state.Idukki.active }
                confirmed = { this.state.Idukki.confirmed }
                recovered = { this.state.Idukki.recovered }
                deceased = { this.state.Idukki.deceased }
                deltaConfirmed = { this.state.IdukkiDelta.confirmed }
                deltaRecovered = { this.state.IdukkiDelta.recovered }
                deltaDeceased = { this.state.IdukkiDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Ernakulam"
                active = { this.state.Ernakulam.active }
                confirmed = { this.state.Ernakulam.confirmed }
                recovered = { this.state.Ernakulam.recovered }
                deceased = { this.state.Ernakulam.deceased }
                deltaConfirmed = { this.state.ErnakulamDelta.confirmed }
                deltaRecovered = { this.state.ErnakulamDelta.recovered }
                deltaDeceased = { this.state.ErnakulamDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>
                <Card
                district = "Kottayam"
                active = { this.state.Kottayam.active }
                confirmed = { this.state.Kottayam.confirmed }
                recovered = { this.state.Kottayam.recovered }
                deceased = { this.state.Kottayam.deceased }
                deltaConfirmed = { this.state.KottayamDelta.confirmed }
                deltaRecovered = { this.state.KottayamDelta.recovered }
                deltaDeceased = { this.state.KottayamDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Alappuzha"
                active = { this.state.Alappuzha.active }
                confirmed = { this.state.Alappuzha.confirmed }
                recovered = { this.state.Alappuzha.recovered }
                deceased = { this.state.Alappuzha.deceased }
                deltaConfirmed = { this.state.AlappuzhaDelta.confirmed }
                deltaRecovered = { this.state.AlappuzhaDelta.recovered }
                deltaDeceased = { this.state.AlappuzhaDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Pathanamthitta"
                active = { this.state.Pathanamthitta.active }
                confirmed = { this.state.Pathanamthitta.confirmed }
                recovered = { this.state.Pathanamthitta.recovered }
                deceased = { this.state.Pathanamthitta.deceased }
                deltaConfirmed = { this.state.PathanamthittaDelta.confirmed }
                deltaRecovered = { this.state.PathanamthittaDelta.recovered }
                deltaDeceased = { this.state.PathanamthittaDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Kollam"
                active = { this.state.Kollam.active }
                confirmed = { this.state.Kollam.confirmed }
                recovered = { this.state.Kollam.recovered }
                deceased = { this.state.Kollam.deceased }
                deltaConfirmed = { this.state.KollamDelta.confirmed }
                deltaRecovered = { this.state.KollamDelta.recovered }
                deltaDeceased = { this.state.KollamDelta.deceased }
                color = {{backgroundColor: `${this.state.theme.cardColor}`}}
                textColor = {{color: `${this.state.theme.accent}`}}/>

                <Card
                district = "Thiruvananthapuram"
                active = { this.state.Thiruvananthapuram.active }
                confirmed = { this.state.Thiruvananthapuram.confirmed }
                recovered = { this.state.Thiruvananthapuram.recovered }
                deceased = { this.state.Thiruvananthapuram.deceased }
                deltaConfirmed = { this.state.ThiruvananthapuramDelta.confirmed }
                deltaRecovered = { this.state.ThiruvananthapuramDelta.recovered }
                deltaDeceased = { this.state.ThiruvananthapuramDelta.deceased }
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
    color: '#455A64',
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
    color: '#455A64',
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
