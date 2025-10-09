import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';

import BookList from '../../components/BookList';
import { genreBooksDummyData } from '../../../assets/dummy/index';

const GenreListScreen = () => {
  const route = useRoute();
  const { genre } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BookList
          title={`${genre}`}
          books={genreBooksDummyData[genre] || []}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default GenreListScreen;