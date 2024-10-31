import React, { useEffect, useState } from 'react';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
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
      })}
    />
  </>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      // If the user is logged in, set the state to true
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        // If the user is signed out, set the state to false
        setIsUserLoggedIn(false);
      }
    })
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {backgroundColor: '#ba55d3'},
          headerTintColor: 'white',
        }}
      >
        {
          // If the user is logged in, show the AppStack, otherwise show the AuthStack  
          isUserLoggedIn ? AppStack : AuthStack
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}