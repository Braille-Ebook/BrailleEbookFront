import React from 'react';
import { ScrollView } from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';


import BookList from '../../components/BookList';
import { libraryDummyData } from '../../../assets/dummy/index';

const NewbooksScreen = () => (
    <ScrollView style={{ padding: 16 }}>
        <BookList title="신간 도서" books={libraryDummyData} />
    </ScrollView>
);

export default NewbooksScreen;
