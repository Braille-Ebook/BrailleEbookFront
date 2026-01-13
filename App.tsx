// npx react-native run-android로 실행
// npx react-native run-ios로 실행
// npm start로 Metro Bundler 실행

import React from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { starIcon, starFillIcon } from './assets/icons';

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

import { AuthProvider, useAuth } from './src/context/AuthContext';
import commonColors from './assets/colors/commonColors';

// ------------------------------
// Bottom Tab 정의
// ------------------------------
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="BookSearchScreen" component={BookSearchScreen} options={{ title: '홈' }} />
      <Tab.Screen name="LibraryScreen" component={LibraryScreen} options={{ title: '서재' }} />
      <Tab.Screen name="MyPageScreen" component={MyPageScreen} options={{ title: '마이페이지' }} />
    </Tab.Navigator>
  );
}

// ------------------------------
// Stack 정의 (탭 포함)
// ------------------------------
const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 하단 탭 */}
      <Stack.Screen name="Bottom" component={BottomTabScreen} />

      {/* 하위 화면 */}
      <Stack.Screen name="GenreListScreen" component={GenreListScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="ReviewEditScreen" component={ReviewEditScreen} />
      <Stack.Screen name="MyBooksScreen" component={MyBooksScreen} />
      <Stack.Screen name="MyReviewsScreen" component={MyReviewsScreen} />
      <Stack.Screen name="PdfScreen" component={PdfScreen} />
    </Stack.Navigator>
  );
}

// ------------------------------
// 인증 Stack 정의
// ------------------------------
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="FindNewIdScreen" component={FindNewIdScreen} />
      <Stack.Screen name="FindNewIdSuccessScreen" component={FindNewIdSuccessScreen} />
      <Stack.Screen name="FindNewPwScreen" component={FindNewPwScreen} />
      <Stack.Screen name="FindNewPwSuccessScreen" component={FindNewPwSuccessScreen} />
    </Stack.Navigator>
  );
}

// ------------------------------
// Root Navigator (Auth 상태에 따라 분기)
// ------------------------------
function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: commonColors.white,
        }}
      >
        <ActivityIndicator size="large" color={commonColors.purple} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

// ------------------------------
// App Entry
// ------------------------------
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}