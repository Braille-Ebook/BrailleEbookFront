import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const GenreButton = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.genreButton} onPress={onPress}>
      <ImageBackground
        source={icon}
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genreButton: {
    width: '48%',          
    height: 114,           
    padding: 10,           
    borderRadius: 13,
    overflow: 'hidden',    // borderRadius 적용
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 13,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: commonColors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '300', 
  },
});

export default GenreButton;