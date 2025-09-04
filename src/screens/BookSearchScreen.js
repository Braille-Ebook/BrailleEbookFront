import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';

import HomeMenubar from '../components/HomeMenubar';

import HomeScreen from './HomeMenu/HomeScreen';
import BestsellerScreen from './HomeMenu/BestsellerScreen';
import NewbooksScreen from './HomeMenu/NewbooksScreen';
import GenrebooksScreen from './HomeMenu/GenrebooksScreen';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';
import { SearchIcon } from '../../assets/icons';

const BookSearchScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      {/* 검색창 */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: commonColors.lightPurple,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 24,
          marginBottom: 16,
        }}
      >
        <TextInput placeholder="책을 검색해 보아요!" editable={false} style={{ flex: 1 }} />
        <Image source={SearchIcon} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      {/* HomeMenubar */}
      <HomeMenubar
        categories={categories}
        selectedIndex={selectedIndex}
        onSelect={(idx) => setSelectedIndex(idx)}
      />

      {/* HomeMenubar에서 선택된 화면 */}
      <View style={{ flex: 1, marginTop: 16 }}>{renderContent()}</View>
    </View>
  );
};

export default BookSearchScreen;
