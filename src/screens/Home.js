import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CategoryMenu from '../components/CategoryMenu';

// 책 더미데이터
const BOOK_DATA = [
  { id: '1', title: '빨간 모자', author: '그림 형제 원작, 김미혜 글', date: '2014.10.31', bookmark: 19820, iconColor: '#6E44FF' },
  { id: '2', title: '백설 공주', author: '그림 형제 원작, 이민지 글', date: '2015.05.20', bookmark: 980, iconColor: '#B0B0B0' },
  { id: '3', title: '신데렐라', author: '샤를 페로 원작, 김가영 글', date: '2016.07.15', bookmark: 150, iconColor: '#6E44FF' },
];

// 책 컴포넌트
const BookItem = ({ item }) => (
  <View style={{ flexDirection: 'row', marginVertical: 10 }}>
    <Image source={require('../assets/red_hood.jpg')} style={{ width: 60, height: 90, marginRight: 10 }} />
    <View>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.author}</Text>
      <Text>{item.date}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Ionicons name="bookmark" size={16} color={item.iconColor} style={{ marginRight: 4 }} />
        <Text>북마크 {item.bookmark}회</Text>
      </View>
    </View>
  </View>
);

const BookSearch = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const categories = ['홈', '인기 도서', '신간 도서', '장르별 도서'];

  // 카테고리별 렌더링 내용
  const renderContent = () => {
    switch (selectedIndex) {
      case 0: // 홈
        return (
          <>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>최근에 읽은 책</Text>
            <BookItem item={BOOK_DATA[0]} />
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 10 }}>추천 책</Text>
            <BookItem item={BOOK_DATA[1]} />
            <BookItem item={BOOK_DATA[2]} />
          </>
        );
      case 1: // 인기 도서
        return BOOK_DATA.map((book) => <BookItem key={book.id} item={book} />);
      case 2: // 신간 도서
        return (
          <>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>📚 신간 도서</Text>
            {BOOK_DATA.map((book) => (
              <BookItem key={book.id} item={book} />
            ))}
          </>
        );
      case 3: // 장르별 도서
        return (
          <>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>🎭 장르별 도서</Text>
            {BOOK_DATA.map((book) => (
              <BookItem key={book.id} item={book} />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* 검색창 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f2e8fc',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 24,
          marginBottom: 16,
        }}
      >
        <TextInput placeholder="책을 검색해 보아요!" style={{ flex: 1 }} />
        <Ionicons name="search" size={20} color="#555" />
      </View>

      {/* 메뉴바 (공통 컴포넌트) */}
      <CategoryMenu
        categories={categories}
        selectedIndex={selectedIndex}
        onSelect={(idx) => setSelectedIndex(idx)}
      />

      {/* 선택된 메뉴에 따른 화면 */}
      {renderContent()}
    </ScrollView>
  );
};

export default BookSearch;