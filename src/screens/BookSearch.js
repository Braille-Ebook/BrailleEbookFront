import { View, Text } from 'react-native';
import React from 'react';
import Book from './Book';
import { bookDummyData } from '../../assets/dummy';

const BookSearch = () => {
    return (
        <View>
            <Book data={bookDummyData} />
        </View>
    );
};

export default BookSearch;
