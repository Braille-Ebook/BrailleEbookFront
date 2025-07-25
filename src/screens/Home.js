import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

// 책 더미데이터
const BOOK_DATA = [
  {
    id: '1',
    title: '빨간 모자',
    author: '그림 형제 원작, 김미혜 글',
    date: '2014.10.31',
    bookmark: 19820,
    iconColor: '#6E44FF',
  },
  {
    id: '2',
    title: '빨간 모자',
    author: '그림 형제 원작, 김미혜 글',
    date: '2014.10.31',
    bookmark: 980,
    iconColor: '#B0B0B0',
  },
  {
    id: '3',
    title: '빨간 모자',
    author: '그림 형제 원작, 김미혜 글',
    date: '2014.10.31',
    bookmark: 150,
    iconColor: '#6E44FF',
  },
];

// 책 컴포넌트
const BookItem = ({ item }) => {
  return (
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
};

const BookSearch = () => {
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

      {/* 메뉴바 */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {['홈', '인기 도서', '신간 도서', '장르별 도서'].map((cat, idx) => (
          <TouchableOpacity
            key={cat}
            style={{
              backgroundColor: idx === 0 ? '#DCC6F6' : '#eee',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              marginRight: 8,
            }}
          >
            <Text style={{ color: idx === 0 ? '#6E44FF' : '#333' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 최근에 읽은 책 */}
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>최근에 읽은 책</Text>
      <BookItem item={BOOK_DATA[0]} />

      {/* 추천 책 */}
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, marginBottom: 10 }}>추천 책</Text>
      <BookItem item={BOOK_DATA[1]} />
      <BookItem item={BOOK_DATA[2]} />
    </ScrollView>
  );
};

export default BookSearch;

