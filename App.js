import React from 'react';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Components/Signup';
import Login from './Components/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {backgroundColor: '#ba55d3'},
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'My App',
          }}
        />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails}
          options={({ navigation, route }) => ({
            title: route.params ? route.params.goalObj.text : "More Details",
            // headerRight: () => (
            //   <Button
            //     title="Warning"
            //     onPress={() => {
            //       console.log("Warning");
            //     }}
            //   />
            // )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}