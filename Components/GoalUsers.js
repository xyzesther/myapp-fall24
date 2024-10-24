import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        console.log(response.status);
        if (!response.ok) {
          throw new Error(`HTTP error happened with status ${response.status}`);
        }
        // call.json() to get the JSON data
        const data = await response.json();
        // write data to firestore using writeToDB;
        data.forEach((users)=>{
          writeToDB(users, `goals/${goalId}/users`);
        })
        // Store the data to get 10 user names to display on the details screen
        setUsers(data);
      } catch (error) {
        console.log("fetch users data ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(users) => users.id}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})