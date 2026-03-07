import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import BookList from '../../components/BookList';
import { getNewBooks } from '../../api/homeApi';

const NewbooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchNewBooks() {
      try {
        const res = await getNewBooks();
        setBooks(res || []);
      } catch (err) {
        setErrorMessage(err?.message || '신간 도서를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchNewBooks();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={commonColors.purple} />
      </View>
    );

  return (
    <ScrollView style={styles.scrollView}>
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
      <Text style={styles.sectionTitle}>신간 도서</Text>
      <BookList books={books} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { paddingLeft: 5 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: commonColors.black,
    marginBottom: -20,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: {
    color: commonColors.blue,
    marginBottom: 12,
  },
});

export default NewbooksScreen;
