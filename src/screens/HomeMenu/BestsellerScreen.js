import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BookList from '../../components/BookList';
import { getPopularBooks } from '../../api/bookApi';
import commonColors from '../../../assets/colors/commonColors';

const BestsellerScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getPopularBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching popular books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.sectionTitle}>인기 도서</Text>
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

export default BestsellerScreen;