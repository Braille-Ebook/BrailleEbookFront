// components/GenreSelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const genres = {
  문학: ['공상과학', '미스터리 호러', '로맨스', '판타지', '문학 소설', '청소년 소설'],
  비문학: ['역사', '철학', '종교', '과학', '취미'],
};

const GenreSelector = ({ selectedCategory, setSelectedCategory, selectedGenre, setSelectedGenre }) => {
  return (
    <View>
      {/* 문학 / 비문학 토글 */}
      <View style={styles.categoryToggle}>
        {['문학', '비문학'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.selectedCategoryButton,
            ]}
            onPress={() => {
              setSelectedCategory(cat);
              setSelectedGenre(null); // 장르 선택 초기화
            }}
          >
            <Text style={selectedCategory === cat ? styles.selectedText : styles.normalText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 장르 버튼들 */}
      <View style={styles.genreContainer}>
        {genres[selectedCategory].map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenre === genre && styles.selectedGenreButton,
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={selectedGenre === genre ? styles.selectedText : styles.normalText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categoryButton: {
    marginHorizontal: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selectedCategoryButton: {
    backgroundColor: '#a78bfa',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genreButton: {
    margin: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f3f3',
  },
  selectedGenreButton: {
    backgroundColor: '#c4b5fd',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  normalText: {
    color: '#333',
  },
});

export default GenreSelector;
