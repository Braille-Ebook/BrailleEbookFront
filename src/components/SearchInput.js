import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';

const SearchInput = ({ query, onChange, onBack, onClear }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.icon}>
        {/* 뒤로가기 아이콘 */}
        {/* 검색 아이콘 */}
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="검색"
        value={query}
        onChangeText={onChange}
        autoFocus
      />
      {query.length > 0 && (
        <Pressable onPress={onClear} style={styles.icon}>
          {/* 취소 아이콘 */}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
});

export default SearchInput;