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
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  text: {
    color: commonColors.white,
    textAlign: 'center',
  },
});

export default GenreButton;