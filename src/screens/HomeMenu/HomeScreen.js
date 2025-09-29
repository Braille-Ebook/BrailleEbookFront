import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable} from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';


import BookList from '../../components/BookList';
import { libraryDummyData } from '../../../assets/dummy/index';

const HomeScreen = () => {
    return (
        <ScrollView style={{ padding: 16 }}>
            <BookList
                title="최근에 읽은 책"
                books={[libraryDummyData[0]]}
            />
            <BookList
                title="추천 책"
                books={[libraryDummyData[1], libraryDummyData[2]]}
            />
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    libraryContainer: {
        height: '100%',
    },
    scrollView: {
        flex: 1,
    }
});

export default HomeScreen;
