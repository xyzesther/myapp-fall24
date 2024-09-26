import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, SafeAreaView, FlatList } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';
import GoalItem from './Components/GoalItem';

export default function App() {
  const appName = 'My First React Native App';
  const [receivedData, setReceivedData] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    console.log("App ", data);
    // declare a new JS object to store the goal
    let newGoal = {text: data, id: Math.random()};
    // update the goals array with the new goal
    setGoals((prevGoals) => {return [...prevGoals, newGoal]});
    setReceivedData(data);
    setVisibility(false);
  }

  function handleCancel() {
    setVisibility(false);
  }

  function goalDeleteHandler(deletedId) {
    console.log("goal deleted", deletedId);
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== deletedId);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button 
          title="Add a Goal" 
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
          contentContainerStyle={styles.scrollViewContent} 
          data={goals} 
          renderItem={({ item })=>{
            return (
              <GoalItem goalObj={item} handleDelete={goalDeleteHandler}/>
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
    alignItems: 'center',
  },
});
