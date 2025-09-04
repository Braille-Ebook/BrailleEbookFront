import React from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';


import BookList from '../../components/BookList';
import { genreBooksDummyData } from '../../../assets/dummy/index';


const GenreListScreen = () => {
    const route = useRoute();
    const { genre } = route.params;

    return (
        <ScrollView style={{ padding: 16 }}>
            <BookList
                title={`${genre} 도서`}
                books={genreBooksDummyData[genre] || []}
            />
        </ScrollView>
    );
};

export default GenreListScreen;
