import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import BookList from '../../components/BookList';
import commonColors from '../../../assets/colors/commonColors';
import { getRecentBooks, getRecommendedBooks } from '../../api/homeApi';

const HomeScreen = () => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [recentRes, recommendRes] = await Promise.all([
          getRecentBooks(),
          getRecommendedBooks(),
        ]);
        setRecentBooks(recentRes.data || []);
        setRecommendedBooks(recommendRes.data || []);
      } catch (err) {
        console.error('홈 데이터 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={commonColors.purple} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>최근에 읽은 책</Text>
      <BookList books={recentBooks.map((item) => item.Book || item)} />

      <Text style={styles.title}>추천 도서</Text>
      <BookList books={recommendedBooks} />
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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;