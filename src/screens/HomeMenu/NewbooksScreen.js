import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';

import BookList from '../../components/BookList';
import { libraryDummyData } from '../../../assets/dummy/index';

const NewbooksScreen = () => (
  <ScrollView style={styles.scrollView}>
    <Text style={styles.sectionTitle}> 신간 도서 </Text>
    <BookList books={libraryDummyData} />
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,          
    fontWeight: 'bold',    
    color: commonColors.black,
    marginBottom: -20,
  },
});

export default NewbooksScreen;
