import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const HomeMenubar = ({ categories, selectedIndex, onSelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((cat, idx) => {
        const isActive = selectedIndex === idx;
        return (
          <TouchableOpacity
            key={idx}
            onPress={() => onSelect(idx)}
            activeOpacity={0.8}
            style={[
              styles.chip,
              {
                backgroundColor: isActive
                  ? commonColors.purple      
                  : commonColors.lightPurple
              },
              idx !== categories.length - 1 && styles.chipSpacing
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isActive ? commonColors.white : commonColors.darkGrey
                }
              ]}
              numberOfLines={1}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,        
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSpacing: {
    marginRight: 8,          
  },
  chipText: {
    fontSize: 14,
    fontWeight: 'medium',
  },
});

export default HomeMenubar;