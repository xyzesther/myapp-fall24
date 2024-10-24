import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readAllDocs, writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if there is already no data in the users sub-collection
        const dataFromDB = await readAllDocs(`goals/${goalId}/users`);
        if (dataFromDB.length) {
          setUsers(
            dataFromDB.map((user) => {
              return user.name;
            })
          );
          return;
        }
        // if not then proceed with fetching from fake API
        console.log("data from API");

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error happened with status ${response.status}`);
        }
        // call.json() to get the JSON data
        const data = await response.json();
        // write data to firestore using writeToDB;
        data.forEach((user)=>{
          writeToDB(user, `goals/${goalId}/users`);
        })
        setUsers(
          data.map((user) => {
            return user.name;
          })
        );
        // setUsers(data);
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
        renderItem={({ item }) => {
          return <Text>{item}</Text>;
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})