import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookSearchScreen from './src/screens/BookSearchScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import MyReviewsScreen from './src/screens/MyReviewsScreen';
import BookScreen from './src/screens/BookScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import ReviewEditScreen from './src/screens/ReviewEditScreen';

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
                <Tab.Screen
                    name='BookSearchScreen'
                    component={BookSearchScreen}
                />
                <Tab.Screen name='LibraryScreen' component={LibraryScreen} />
                <Tab.Screen name='MyPageScreen' component={MyPageScreen} />
            </Tab.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Bottom' component={BottomTabScreen} />
                <Stack.Screen name='BookScreen' component={BookScreen} />
                <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
                <Stack.Screen
                    name='ReviewEditScreen'
                    component={ReviewEditScreen}
                />
                <Stack.Screen name='MyBooksScreen' component={MyBooksScreen} />
                <Stack.Screen
                    name='MyReviewsScreen'
                    component={MyReviewsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
