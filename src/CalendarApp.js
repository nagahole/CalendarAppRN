import { Box, Center, Text } from "native-base";
import { useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import MainAppStack from "./stacks/MainAppStack";
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faPlus, faArrowLeft);

const Stack = createNativeStackNavigator();

export default function CalendarApp() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <Stack.Screen name="Login Screen" component={LoginScreen}/>
      <Stack.Screen name="Signup Screen" component={SignupScreen}/>
      <Stack.Screen name="Main App Stack" component={MainAppStack}/>
    </Stack.Navigator>
  )
}