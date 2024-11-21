import React, { useEffect, useState } from 'react';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PressableButton from './Components/PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import Map from './Components/Map';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    }
  },
});

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
      options={({ navigation, route }) => {
        return {
          title: 'My App',
          headerRight: () => {
            return (
            <PressableButton
              pressedFunction={() => navigation.navigate('Profile')}
              componentStyle={{backgroundColor: 'transparent', marginRight: 10}}
            >
              <MaterialCommunityIcons name="face-man-profile" size={24} color="white" />
            </PressableButton>
            )
          },
        }
      }}
    />
    <Stack.Screen 
      name="Details" 
      component={GoalDetails}
      options={({ navigation, route }) => {
        return {
          title: route.params ? route.params.goalObj.text : "More Details",
        };
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => {
        return {
          headerRight: () => {
            return (
                <PressableButton
                pressedFunction={() => {
                  try {
                    signOut(auth)
                  }
                  catch(error) {
                    console.log('Sign out Error: ', error.code);
                  }}
                }
                componentStyle={{backgroundColor: 'transparent', marginRight: 10}}
              >
                <AntDesign name="logout" size={24} color="white" />
              </PressableButton>
            )
          },
        }
      }}
    />
    <Stack.Screen
      name="Map"
      component={Map}
    />
  </>
);

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("listener ", user);
      // If the user is logged in, set the state to true
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        // If the user is signed out, set the state to false
        setIsUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    }
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