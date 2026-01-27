import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import BookList from '../../components/BookList';
import { getBooksByGenre } from '../../api/homeApi';

const GenreListScreen = () => {
  const route = useRoute();
  const { genre } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenreBooks() {
      try {
        const res = await getBooksByGenre(genre);
        setBooks(res.data || []);
      } catch (err) {
        console.error('장르별 도서 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGenreBooks();
  }, [genre]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={commonColors.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.genreTitle}>{genre}</Text>
        <BookList books={books} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 20 },
  genreTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default GenreListScreen;