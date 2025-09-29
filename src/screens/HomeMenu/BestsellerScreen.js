import React from 'react';
import { ScrollView } from 'react-native';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';

import BookList from '../../components/BookList';
import { libraryDummyData } from '../../../assets/dummy/index';

const BestsellerScreen = () => (
    <ScrollView>
        <BookList books={libraryDummyData} />
    </ScrollView>
);

export default BestsellerScreen;
