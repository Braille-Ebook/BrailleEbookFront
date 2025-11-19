import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 

import HomeMenubar from '../../components/HomeMenubar';
import SearchScreen from '../SearchScreen';

import HomeScreen from './HomeScreen';
import BestsellerScreen from './BestsellerScreen';
import NewbooksScreen from './NewbooksScreen';
import GenrebooksScreen from './GenrebooksScreen';

import commonColors from '../../../assets/colors/commonColors';
import { SearchIcon } from '../../../assets/icons';

const BookSearchScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation(); 
  const categories = ['홈', '인기 도서', '신간 도서', '장르별 도서'];

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <BestsellerScreen />;
      case 2:
        return <NewbooksScreen />;
      case 3:
        return <GenrebooksScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* 검색창 */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SearchScreen')} 
          accessibilityRole="button"
          accessibilityLabel="검색창 열기"
        >
          <TextInput
            placeholder="책을 검색해 보아요!"
            editable={false}
            style={styles.searchInput}
            pointerEvents="none" 
          />
          <Image source={SearchIcon} style={styles.searchIcon} />
        </TouchableOpacity>

        {/* 메뉴바 */}
        <HomeMenubar
          categories={categories}
          selectedIndex={selectedIndex}
          onSelect={(idx) => setSelectedIndex(idx)}
        />

        {/* 선택된 화면 콘텐츠 */}
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  inner: { flex: 1, paddingHorizontal: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: commonColors.lightPurple,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    marginBottom: 16,
  },
  searchInput: { flex: 1 },
  searchIcon: { width: 40, height: 40 },
  contentContainer: { flex: 1, marginTop: 16 },
});

export default BookSearchScreen;