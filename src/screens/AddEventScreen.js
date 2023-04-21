import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { AspectRatio, Box, Center, HStack, Input, Switch, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { v4 as uuidv4 } from 'uuid';

export default function AddEventScreen({ route, navigation }) {

  const data = route.params?.data ?? {};

  const [title, setTitle] = useState(data.title?? "");
  const [description, setDescription] = useState(data.description?? "");
  const [date, setDate] = useState(data.date != null? new Date(data.date) : new Date());
  const [allDay, setAllDay] = useState(data.allDay?? false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  function handleDeleteEvent() {

    Alert.alert(
      "Are you sure you want to delete this event?",
      "This cannot be undone",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress() {
            setButtonsDisabled(true);

            firestore()
              .collection("users")
              .doc(auth().currentUser.uid)
              .collection("events")
              .doc(data.id)
              .delete()
              .then(() => {
                setButtonsDisabled(false);
                setTitle("");
                setDescription("");
                navigation.goBack();
              })
              .catch(e => {
                setButtonsDisabled(false);
                Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
              });
          }
        },
        {
          text: "No",
          style: "cancel"
        }
      ]
    );
  }

  function handleSave() {

    if (title === "")
    {
      Alert.alert("Please add a title");
      return;
    }

    setButtonsDisabled(true);

    if (data.id != null) {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("events")
        .doc(data.id)
        .set({
          id: data.id,
          title,
          description,
          date: date.getTime(),
          allDay
        })
        .then(() => {
          setButtonsDisabled(false);
          setTitle("");
          setDescription("");
          navigation.goBack();
        })
        .catch(e => {
          setButtonsDisabled(false);
          Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
        });
    } else {

      let id = uuidv4();

      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("events")
        .doc(id)
        .set({
          id,
          title,
          description,
          date: date.getTime(),
          allDay
        })
        .then(() => {
          setButtonsDisabled(false);
          setTitle("");
          setDescription("");
          navigation.goBack();
        })
        .catch(e => {
          setButtonsDisabled(false);
          Alert.alert(e.nativeErrorCode?? e.code, e.nativeErrorMessage?? e.message);
        });
    }
  }

  return (
    <VStack safeArea w="100%" h="100%" bg="white">
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center">
        <TouchableOpacity onPress={() => { navigation.goBack() }} disabled={buttonsDisabled}>
          <Center p="3" borderWidth={2} rounded={8} w="12" h="12">
            <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={buttonsDisabled}>
          <Text fontSize="17" fontWeight="500" mr="2" color="#8a19fd">Save</Text>
        </TouchableOpacity>
      </HStack>
      <VStack px="5" py="3" flex={1}>
        <Input
          placeholder="Add title"
          value={title}
          onChangeText={setTitle}
          borderWidth={0}
          borderBottomWidth={1}
          rounded={0}
          fontSize="24"
          _focus={{
            bg: "transparent",
            borderColor: "#8a19fd"
          }}
        />
        <Input
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={5}
          borderWidth={0}
          rounded={0}
          fontSize="16"
          _focus={{
            bg: "transparent",
            borderColor: "#8a19fd"
          }}
          height="32"
        />
        <HStack px="2" py="5" justifyContent="space-between" alignItems="center">
          <Text fontSize="17" mb="1">All day</Text>
          <Switch onTrackColor="#8a19fd" value={allDay} onToggle={bool => setAllDay(bool)}/>
        </HStack>
        <Center w="100%">
          <DatePicker
            mode={allDay? "date" : "datetime"}
            date={date}
            onDateChange={setDate}
          />
        </Center>
      </VStack>
      {
        data.id && (
          <Box px="3">
            <TouchableOpacity onPress={handleDeleteEvent}>
              <Center h="10" bg="red.500" rounded={8}>
                <Text color="white" fontSize="18">Delete event</Text>
              </Center>
            </TouchableOpacity>
          </Box>
        )
      }
    </VStack>
  )
}