import React, { useState } from 'react'
import { Center, VStack, Text, Input } from 'native-base'
import { Alert, TouchableOpacity } from 'react-native'
import auth from "@react-native-firebase/auth";

export default function SignupScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup() {
    if (password != confirmPassword) {
      Alert.alert("Passwords aren't matching");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        user.sendEmailVerification()
      })
      .catch(e => {
        if (e.code === 'auth/email-already-in-use') {
          Alert.alert("Email already in use", e.nativeErrorMessage?? e.message);
        } else if (e.code === 'auth/invalid-email') {
          Alert.alert("Invalid email", e.nativeErrorMessage?? e.message);
        } else {
          Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
        }
      });
  }

  return (
    <Center safeArea w="100%" h="100%" bg="white">
      <VStack space={4} w="100%" h="100%" justifyContent="center" alignItems="center">
        <Center w="90%" h="56" shadow={9} bg="white" p="5">
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
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
        <TouchableOpacity onPress={handleSignup}>
          <Center bg="#8a19fd" borderWidth={2} borderColor="#8a19fd" w="40" p="3" mt="5">
            <Text color="white" fontSize={18}>SIGN UP</Text>
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Center bg="white" borderWidth={2} p="3" w="40">
            <Text color="black" fontSize={18}>GO BACK</Text>
          </Center>
        </TouchableOpacity>
      </VStack>
    </Center>
  )
}