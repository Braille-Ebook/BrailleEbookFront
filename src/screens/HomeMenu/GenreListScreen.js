import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import BookList from '../../components/BookList';
import ScreenHeader from '../../components/ScreenHeader';
import { getBooksByGenre } from '../../api/homeApi';

const GenreListScreen = () => {
  const route = useRoute();
  const { genre } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchGenreBooks() {
      try {
        const res = await getBooksByGenre(genre);
        setBooks(res || []);
      } catch (err) {
        setErrorMessage(err?.message || '장르별 도서를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchGenreBooks();
  }, [genre]);

  if (loading) {
    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader fallbackRoute='Bottom' title={genre} />
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={commonColors.purple} />
            </View>
        </SafeAreaView>
    );
  }

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader fallbackRoute='Bottom' title={genre} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {errorMessage !== '' && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                <BookList books={books} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: {
        color: commonColors.blue,
        marginBottom: 12,
    },
});

export default GenreListScreen;
