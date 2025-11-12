import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import commonColors from '../../assets/colors/commonColors';
import { BackIcon, CloseIcon } from '../../assets/icons';
import { libraryDummyData } from '../../assets/dummy';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  // 검색 결과 필터링
  const filteredBooks = libraryDummyData.filter(
    (book) =>
      book.title.includes(query) ||
      book.author.includes(query) ||
      book.translator?.includes(query)
  );

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subText}>
          {item.author} {item.translator ? `, ${item.translator}` : ''} {item.category || ''}
        </Text>
      </View>
      <Image
        source={
          item.isBookmarked
            ? require('../../assets/icons/bookmarkIconFill.png')
            : require('../../assets/icons/bookmarkIcon.png')
        }
        style={styles.bookmarkIcon}
      />
    </View>
  );

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
          autoFocus
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Image source={CloseIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* 검색 결과 리스트 */}
      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyboardShouldPersistTaps="handled"
      />
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
  listContainer: {
    paddingHorizontal: 16,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: commonColors.lightGrey,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: commonColors.black,
  },
  subText: {
    fontSize: 14,
    color: commonColors.darkGrey,
    marginTop: 2,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    tintColor: commonColors.purple,
  },
});         