import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BookSearch from './src/screens/Home';
import Library from './src/screens/Library';
import MyPage from './src/screens/MyPage';

import { NavigationContainer } from '@react-navigation/native';

function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const BottomTabScreen = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        height: 70,
                    },
                })}
            >
                <Tab.Screen name='BookSearch' component={BookSearch} />
                <Tab.Screen name='Library' component={Library} />
                <Tab.Screen name='MyPage' component={MyPage} />
            </Tab.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Bottom' component={BottomTabScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
