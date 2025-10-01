// components/CategoryMenu.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CategoryMenu = ({ categories, selectedIndex, onSelect }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
      {categories.map((cat, idx) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(idx)}
          style={{
            backgroundColor: idx === selectedIndex ? '#DCC6F6' : '#eee',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginRight: 8,
          }}
        >
          <Text style={{ color: idx === selectedIndex ? '#6E44FF' : '#333' }}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryMenu;