import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AddEventScreen from "../screens/AddEventScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeDrawer from "./HomeDrawer";

const Stack = createNativeStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home Drawer" component={HomeDrawer}/>
      <Stack.Screen name="Add Event Screen" component={AddEventScreen}/>
    </Stack.Navigator>
  )
}