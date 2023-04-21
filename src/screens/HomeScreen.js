import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda } from 'react-native-calendars';
import { Box, HStack } from 'native-base';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const daysBackwardsToRender = 365 * 1;
const daysForwardsToRender = 365 * 1.5;

export default function HomeScreen({ navigation }) {

  const [agendaData, setAgendaData] = useState({});

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("events")
      .onSnapshot(querySnapshot => {

        let res = {};

        let start = new Date(Date.now() - 60 * 60 * 24 * daysBackwardsToRender * 1000);
        let until = new Date(Date.now() + 60 * 60 * 24 * daysForwardsToRender * 1000);

        for (
            let d = start; 
            d <= until; 
            d.setDate(d.getDate() + 1)
          ) {
          res[moment(d).format("YYYY-MM-DD")] = [];
        }

        let data = [];

        querySnapshot.forEach(queryDocumentSnapshot => {
          data.push(queryDocumentSnapshot.data());
        });

        data.sort((a, b) => {
          if (a.allDay) {
            return -1;
          } else if (b.allDay) {
            return 1;
          } else {
            return a.date - b.date;
          }
        });

        for (let d of data)
        {
          let date = new Date(d.date);

          let dateString = moment(date).format("YYYY-MM-DD");

          if (res.hasOwnProperty(dateString)) {
            res[dateString].push(d);
          } else {
            res[dateString] = [d];
          }
        }

        setAgendaData(res);

      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [auth().currentUser.uid])

  return (
    <Box safeArea w="100%" h="100%" bg="white">
      <HStack h="12" bg="white" justifyContent="space-between" alignItems="center" px="6">
        <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
          <FontAwesomeIcon icon="fa-solid fa-bars" size={20}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Add Event Screen") }}>
          <FontAwesomeIcon icon="fa-solid fa-plus" size={20}/>
        </TouchableOpacity>
      </HStack>
      <Agenda
        style={{
          width: "100%",
          height: "100%"
        }}
        items={agendaData}
        renderItem={item => (
          <TouchableOpacity onPress={() => { navigation.navigate("Add Event Screen", { data: item }) }}>
            <Box 
              flex={1}
              borderRadius="10"
              p="3"
              mr="5"
              mt="4"
              bg="white"
            >
              <HStack w="100%" justifyContent="space-between">
                <Text color="white" flex={1.75} fontSize={22} lineHeight={28} mt="-1">{item.title}</Text>
              </HStack>
              <Text mt="0.5" color="gray.200">{ item.allDay? "All day" : moment(new Date(item.date)).format('h:mm a') }</Text>
              <Text mt="0.5" color="gray.200">{item.description}</Text>
            </Box>
          </TouchableOpacity>
        )}
      />
    </Box>
  )
}