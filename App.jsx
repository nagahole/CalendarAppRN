import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import CalendarApp from './src/CalendarApp';
import 'react-native-get-random-values';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <CalendarApp/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}