import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BookListItem from './BookListItem';
import { normalizeBookData } from '../utils';

const BookList = ({ title, books = [] }) => {
    const navigation = useNavigation();
    const normalizedBooks = books.map(normalizeBookData);

    return (
        <View style={styles.container}>
            {title ? <Text style={styles.title}>{title}</Text> : null}

            <View style={styles.list}>
                {normalizedBooks.map((book, idx) => (
                    <Pressable
                        key={book?.book_id ?? book?.id ?? idx}
                        disabled={!book?.book_id && !book?.id}
                        style={styles.itemPressable}
                        onPress={() =>
                            navigation.navigate('BookScreen', {
                                bookId: book?.book_id ?? book?.id,
                            })
                        }
                    >
                        <BookListItem data={book} />
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    list: {
        width: '100%',
    },
    itemPressable: {
        width: '100%',
    },
});

export default BookList;
