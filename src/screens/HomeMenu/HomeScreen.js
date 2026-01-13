import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BookList from '../../components/BookList';
import { getRecentBooks, getRecommendBooks } from '../../api/bookApi';

const HomeScreen = () => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const recent = await getRecentBooks();
        const recommend = await getRecommendBooks();
        setRecentBooks(recent.map((item) => item.Book)); // BookList에 맞게 변환
        setRecommendBooks(recommend);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>최근에 읽은 책</Text>
      <BookList books={recentBooks} />
      <Text style={styles.title}>추천 책</Text>
      <BookList books={recommendBooks} />
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