import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const GenreButton = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.genreButton} onPress={onPress}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genreButton: {
    marginBottom: 12,
    width: '48%', // 2열
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  text: {
    color: '#333',
    textAlign: 'center',
  },
});

export default GenreButton;