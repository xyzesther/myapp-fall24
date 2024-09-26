import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'My First React Native App';
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
        {goals.map((goal) => {
          return (
            <View key={goal.id} style={styles.textContainer}>
              <Text style={styles.text}>
                {goal.text}
              </Text>
            </View>
          );
        })}
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

  textContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
  },

  text: {
    color: "purple",
    fontSize: 25,
    padding: 10,
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: 'center',
  },
});
