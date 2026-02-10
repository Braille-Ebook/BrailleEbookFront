import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { BookListItem } from '../components';
import { bookOpened } from '../../assets/icons';
import { libraryDummyData } from '../../assets/dummy';
import commonStyles from '../../assets/styles/commonStyles';

import { getLibraryInfo } from '../api/_index';

const LibraryScreen = () => {
    const navigation = useNavigation();
    const { realData, isLoading, error } = useQuery({
        queryKey: ['library'],
        queryFn: getLibraryInfo,
    });
    return (
        <View style={styles.libraryContainer}>
            <View style={styles.titleContainer}>
                <Image source={bookOpened} style={styles.bookOpened} />
                <Text style={commonStyles.titleText}>내 라이브러리</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {libraryDummyData.map((data, index) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate('BookScreen');
                        }}
                        key={index}
                    >
                        <BookListItem data={data} />
                    </Pressable>
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
        paddingLeft: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 35,
    },
});

export default LibraryScreen;
