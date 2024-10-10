import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState } from 'react';
import GoalItem from './GoalItem';

export default function Home({ navigation }) {
  const appName = 'My First React Native App';
  const [visibility, setVisibility] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    console.log("App ", data);
    // declare a new JS object to store the goal
    let newGoal = {text: data, id: Math.random()};
    // update the goals array with the new goal
    setGoals((prevGoals) => {return [...prevGoals, newGoal]});
    setVisibility(false);
  }

  function handleCancel() {
    setVisibility(false);
  }

  function goalDeleteHandler(deletedId) {
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== deletedId);
    });
  }

  // function goalPressHandler(pressedGoal) {
  //   console.log("Goal Pressed")
  //   navigation.navigate('Details', { goalObj: pressedGoal });
  // }

  function handleDeleteAllConfirm() {
    Alert.alert(
      'Delete All',
      'Are you sure to delete all goals?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteAllHandler();
          },
        },
        {cancelable: false}
      ]
    );
  }

  function deleteAllHandler() {
    setGoals([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button 
          title="Add A Goal" 
          onPress={() => {
            setVisibility(true);
          }} 
        />
      </View>
      <Input 
        textInputFocus={true} 
        inputHandler={handleInputData}
        cancelHandler={handleCancel} 
        modalVisible={visibility}
      />
      <View style={styles.bottomView}>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.goalListEmpty}>
              No Goals To Show
            </Text>
          }
          ListHeaderComponent={ goals.length > 0 &&
            <Text style={styles.goalListHeader}>
              My Goal List
            </Text>
          }
          ItemSeparatorComponent={
            <View style={styles.itemSeparator}/>  
          }
          ListFooterComponent={ goals.length > 0 &&
            <View style={styles.goalListFooter}>
              <Button 
                title="Delete All" 
                onPress={handleDeleteAllConfirm}
              />
            </View>
          }
          contentContainerStyle={styles.scrollViewContent} 
          data={goals} 
          renderItem={({ item })=>{
            return (
              <GoalItem 
                goalObj={item} 
                handleDelete={goalDeleteHandler} 
                // handlePress={goalPressHandler}
              />
            );
          }}/>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {goals.map((goal) => {
            return (
              <View key={goal.id} style={styles.textContainer}>
                <Text style={styles.text}>
                  {goal.text}
                </Text>
              </View>
            );
          })}
        </ScrollView> */}
        {/* <View style={styles.textContainer}>
          <Text style={styles.text}>
            {receivedData}
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
  },

  scrollViewContent: {
    alignItems: "center",
  },

  goalListEmpty: {
    color: "grey",
    fontSize: 20,
    padding: 50,
  },

  goalListHeader: {
    color: "purple",
    fontSize: 25,
    padding: 20,
  },

  goalListFooter: {
    fontSize: 12,
    marginTop: 25,
  },

  itemSeparator: {
    height: 1,
    backgroundColor: "purple",
    marginVertical: 10,
  },
});