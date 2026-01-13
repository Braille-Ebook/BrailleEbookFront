import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonColors from '../../assets/colors/commonColors';
import { BackIcon, CloseIcon } from '../../assets/icons';
import BookList from '../components/BookList';
import { searchBooks } from '../api/searchApi';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await searchBooks(query);
      setBooks(res.data?.items || []);
    } catch (err) {
      console.error('검색 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 검색바 */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="책을 검색하세요"
          placeholderTextColor={commonColors.grey}
          style={styles.input}
          onSubmitEditing={handleSearch}
          autoFocus
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Image source={CloseIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={commonColors.purple} />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <BookList books={books} />
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.white,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: commonColors.darkGrey,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 18,
    color: commonColors.black,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
});