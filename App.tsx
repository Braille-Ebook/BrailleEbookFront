import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { starIcon, starFillIcon } from './assets/icons/';

import BookSearchScreen from './src/screens/BookSearchScreen';
import GenreListScreen from './src/screens/HomeMenu/GenreListScreen';

import LibraryScreen from './src/screens/LibraryScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import MyReviewsScreen from './src/screens/MyReviewsScreen';
import BookScreen from './src/screens/BookScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import ReviewEditScreen from './src/screens/ReviewEditScreen';

function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    // BottomTab
    function BottomTabScreen() {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: { height: 70 },
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={focused ? starFillIcon : starIcon}
                            style={{ width: 24, height: 24 }}
                        />
                    ),
                })}
            >
                <Tab.Screen name='BookSearchScreen' component={BookSearchScreen} />
                <Tab.Screen name='LibraryScreen' component={LibraryScreen} />
                <Tab.Screen name='MyPageScreen' component={MyPageScreen} />
            </Tab.Navigator>
        );
    }

    // App Navigator
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Bottom' component={BottomTabScreen} />

                <Stack.Screen name="GenreListScreen" component={GenreListScreen} />

                <Stack.Screen name='BookScreen' component={BookScreen} />
                <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
                <Stack.Screen name='ReviewEditScreen' component={ReviewEditScreen} />
                <Stack.Screen name='MyBooksScreen' component={MyBooksScreen} />
                <Stack.Screen name='MyReviewsScreen' component={MyReviewsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
