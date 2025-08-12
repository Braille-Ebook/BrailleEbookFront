import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchContent = ({ results, onToggleBookmark }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <Pressable onPress={() => onToggleBookmark(item.id)}>
        <MaterialIcons
          name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={item.bookmarked ? '#673ab7' : '#ccc'}
        />
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 16,
  },
  author: {
    fontSize: 13,
    color: 'gray',
  },
});

export default SearchContent;