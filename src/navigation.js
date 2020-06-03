import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from '../components/home';
import News from '../components/news';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      inactiveColor = "#3e2465"
      barStyle={{ backgroundColor: 'tomato', paddingBottom:0, opacity: 1 }}
      
      
    >
      <Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
          ),
        }}/>
      <Tab.Screen name="Settings" component={News} options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26}/>
          ),
        }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}