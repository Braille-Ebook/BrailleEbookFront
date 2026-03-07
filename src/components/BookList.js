import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BookListItem from './BookListItem';

const BookList = ({ title, books = [] }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View>
                {books.map((book, idx) => (
                    <Pressable
                        key={book?.book_id ?? book?.id ?? idx}
                        disabled={!book?.book_id && !book?.id}
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

const styles = {
    container: { marginBottom: 20 },
    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
};

export default BookList;
