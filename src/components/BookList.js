import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import BookListItem from './BookListItem';

const BookList = ({ title, books }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
                {title}
            </Text>

            <View>
                {books.map((book, idx) => (
                    <BookListItem key={idx} data={book} />
                ))}
            </View>
        </View>
    );
};

export default BookList;