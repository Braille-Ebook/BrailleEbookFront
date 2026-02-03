// 실행 명렁어
// npx react-native run-android
// npx react-native run-ios
// npm start로 Metro Bundler

// npx react-native start --reset-cache & npx react-native run-ios --simulator="iPhone 16 Pro"

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { starIcon, starFillIcon } from './assets/icons/';

import LoginScreen from './src/screens/Login/LoginScreen';
import SignUpScreen from './src/screens/Login/SignUpScreen';
import FindNewIdScreen from './src/screens/Login/FindNewPwScreen';
import FindNewIdSuccessScreen from './src/screens/Login/FindNewPwSuccessScreen';
import FindNewPwScreen from './src/screens/Login/FindNewPwScreen';
import FindNewPwSuccessScreen from './src/screens/Login/FindNewPwSuccessScreen';

import BookSearchScreen from './src/screens/HomeMenu/BookSearchScreen';
import SearchScreen from './src/screens/SearchScreen';
import GenreListScreen from './src/screens/HomeMenu/GenreListScreen';

import LibraryScreen from './src/screens/LibraryScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import MyBooksScreen from './src/screens/MyBooksScreen';
import MyReviewsScreen from './src/screens/MyReviewsScreen';
import BookScreen from './src/screens/BookScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import ReviewEditScreen from './src/screens/ReviewEditScreen';

import PdfScreen from './src/screens/PdfScreen';

function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const queryClient = new QueryClient();

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
                <Tab.Screen
                    name='BookSearchScreen'
                    component={BookSearchScreen}
                />
                <Tab.Screen name='LibraryScreen' component={LibraryScreen} />
                <Tab.Screen name='MyPageScreen' component={MyPageScreen} />
            </Tab.Navigator>
        );
    }

    // App Navigator
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Bottom' component={BottomTabScreen} />
                    <Stack.Screen
                        name='GenreListScreen'
                        component={GenreListScreen}
                    />
                    <Stack.Screen
                        name='SearchScreen'
                        component={SearchScreen}
                    />
                    <Stack.Screen name='BookScreen' component={BookScreen} />
                    <Stack.Screen
                        name='ReviewScreen'
                        component={ReviewScreen}
                    />
                    <Stack.Screen
                        name='ReviewEditScreen'
                        component={ReviewEditScreen}
                    />

                    <Stack.Screen
                        name='MyBooksScreen'
                        component={MyBooksScreen}
                    />
                    <Stack.Screen name='PdfScreen' component={PdfScreen} />
                    <Stack.Screen
                        name='MyReviewsScreen'
                        component={MyReviewsScreen}
                    />

                    <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    <Stack.Screen
                        name='SignUpScreen'
                        component={SignUpScreen}
                    />
                    <Stack.Screen
                        name='FindNewIdScreen'
                        component={FindNewIdScreen}
                    />
                    <Stack.Screen
                        name='FindNewIdSuccessScreen'
                        component={FindNewIdSuccessScreen}
                    />
                    <Stack.Screen
                        name='FindNewPwScreen'
                        component={FindNewPwScreen}
                    />
                    <Stack.Screen
                        name='FindNewPwSuccessScreen'
                        component={FindNewPwSuccessScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

export default App;
