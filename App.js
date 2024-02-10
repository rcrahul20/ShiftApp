// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShiftProvider } from './ShiftContext';
import MyShiftsScreen from './MyShiftsScreen';
import AvailableShiftsScreen from './AvailableShiftsScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ShiftProvider>
        <Tab.Navigator>
          <Tab.Screen  name="My Shifts" component={MyShiftsScreen}  
          options={{
          tabBarIcon: ({ color, size }) => null, // Hide the icon
          tabBarLabel: ({ color, size }) => (
            <Text style={{ fontSize: 18, fontWeight: 'bold', color ,bottom:10 }}>My Shifts</Text>
          ),
        }} />
          <Tab.Screen name="Available Shifts" component={AvailableShiftsScreen}
               options={{
                tabBarIcon: ({ color, size }) => null, // Hide the icon
                tabBarLabel: ({ color, size }) => (
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color ,bottom:10 }}>Available Shifts</Text>
                ),
              }}
          />
        </Tab.Navigator>
      </ShiftProvider>
    </NavigationContainer>
  );
};

export default App;
