import React, { useEffect, useState } from 'react'
import { Box, Center, Input, Text, VStack } from 'native-base'
import { Alert, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function LoginScreen({ navigation }) {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);

    if (user) {
      navigation.navigate("Main App Stack");
    }
  }

  function handleLogin() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Main App Stack");
      })
      .catch(e => {

        if (e.code == "auth/wrong-password") {
          Alert.alert("Wrong Password", e.nativeErrorMessage?? e.message);
        } else {
          Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
        }
      });
  }

  if (initializing) return <Box w="100%" h="100%" bg="white"/>;

  return (
    <Center safeArea w="100%" h="100%" bg="white">
      <VStack space={4} w="100%" h="100%" justifyContent="center" alignItems="center">
        <Text fontSize={32} letterSpacing={5}>CALENDARIUM</Text>
        <Center w="90%" h="40" shadow={9} bg="white" p="5">
          <VStack w="100%" h="100%" space={5} justifyContent="center" pb="3">
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              type="text"
              borderWidth={0}
              borderBottomWidth={1}
              rounded={0}
              fontSize="17"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              _focus={{
                bg: "white",
                borderColor: "#8a19fd"
              }}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              type="password"
              borderWidth={0}
              borderBottomWidth={1}
              rounded={0}
              fontSize="17"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              _focus={{
                bg: "white",
                borderColor: "#8a19fd"
              }}
            />
          </VStack>
        </Center>
        <TouchableOpacity onPress={handleLogin}>
          <Center bg="#8a19fd" borderWidth={2} borderColor="#8a19fd" w="40" p="3" mt="5">
            <Text color="white" fontSize={18}>LOG IN</Text>
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Signup Screen") }}>
          <Center bg="white" borderWidth={2} p="3" w="40">
            <Text color="black" fontSize={18}>SIGN UP</Text>
          </Center>
        </TouchableOpacity>
      </VStack>
    </Center>
  )
}