import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BookList from '../../components/BookList';
import commonColors from '../../../assets/colors/commonColors';
import { getNewBooks } from '../../api/bookApi';

const NewbooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const data = await getNewBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching new books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewBooks();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.sectionTitle}>신간 도서</Text>
      <BookList books={books} />
    </ScrollView>
  );
};

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
