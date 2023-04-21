import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Box, Center, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function SettingsScreen({ navigation }) {

  function handleSignout() {
    Alert.alert(
      "Are you sure you want to sign out?",
      "",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress() {
            auth()
              .signOut()
              .then(() => {
                navigation.replace("Login Screen");
              })
              .catch(e => {
                Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
              });
          }
        },
        {
          text: "No",
          style: "cancel"
        }
      ]
    )
  }

  return (
    <Box safeArea w="100%" h="100%" bg="white">
      <HStack h="12" bg="white" justifyContent="space-between" alignItems="center" px="6">
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <FontAwesomeIcon icon="fa-solid fa-bars" size={20}/>
        </TouchableOpacity>
      </HStack>
      <VStack mt="12" px="3" alignItems="center" space={12}>
        <Text fontSize="16">{auth().currentUser.email}</Text>
        <TouchableOpacity style={{ width: "100%" }} onPress={handleSignout}>
          <Center bg="gray.500" h="10" rounded={8}>
            <Text color="white" fontSize="18">Log out</Text>
          </Center>
        </TouchableOpacity>
      </VStack>
    </Box>
  )
}