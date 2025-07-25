import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ query, onChange, onBack, onClear }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.icon}>
        <Ionicons name="arrow-back" size={24} color="black" />
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
          <Ionicons name="close" size={20} color="gray" />
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