import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonColors from '../../assets/colors/commonColors';
import { backIcon, cancelIcon } from '../../assets/icons';
import BookList from '../components/BookList';
import { searchBooks } from '../api/searchApi';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await searchBooks(query);
      setBooks(res?.items || []);
    } catch (err) {
      setBooks([]);
      setErrorMessage(err?.message || '검색에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 검색바 */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="책을 검색하세요"
          placeholderTextColor={commonColors.lightGrey}
          style={styles.input}
          onSubmitEditing={handleSearch}
          autoFocus
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Image source={cancelIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={commonColors.purple} />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
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
  errorText: {
    color: commonColors.blue,
    marginBottom: 12,
  },
});
