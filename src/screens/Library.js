import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import Book from '../components/Book';
import commonStyles from '../../assets/styles/commonStyles';

const libraryDummyData = [
    {
        title: '빨간 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '노란 모자',
        author: '그림 형제',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 210,
        isBookmarked: false,
    },
    {
        title: '파란 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '보라 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: true,
    },
    {
        title: '파란 모자',
        author: '그림 형제',
        translator: '김미혜',
        publishDate: new Date('2014-10-31'),
        bookmarkNum: 19820,
        isBookmarked: false,
    },
];

const Library = () => {
    return (
        <View style={styles.libraryContainer}>
            <View style={styles.titleContainer}>
                <Image
                    source={require('../../assets/icons/bookOpened.png')}
                    style={styles.bookOpened}
                />
                <Text style={commonStyles.titleText}>내 라이브러리</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {libraryDummyData.map((data, index) => (
                    <Book data={data} key={index} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    libraryContainer: {
        height: '100%',
    },
    bookOpened: {
        marginRight: 16,
    },
    scrollView: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 35,
    },
});

export default Library;
