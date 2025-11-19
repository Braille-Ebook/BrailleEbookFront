import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';

import BookList from '../../components/BookList';
import { libraryDummyData } from '../../../assets/dummy/index';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Text style={styles.title}>최근에 읽은 책</Text>
      <BookList
        books={[libraryDummyData[0]]}
      />
      <Text style={styles.title}>추천 책</Text>
      <BookList
        books={[libraryDummyData[1], libraryDummyData[2]]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 5,
    paddingVertical: 5,  
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,       
    fontWeight: 'bold',
    marginBottom: -20,
  },
});

export default HomeScreen;