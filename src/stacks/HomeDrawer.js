import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import React from 'react'
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="Home Screen" component={HomeScreen} options={{ title: "Home" }}/>
      <Drawer.Screen name="Settings Screen" component={SettingsScreen} options={{ title: "Settings" }}/>
    </Drawer.Navigator>
  )
}