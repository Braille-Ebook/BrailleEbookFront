import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { BookListItem } from '../components';
import { bookOpened } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import { getLibraryInfo } from '../api';

const LibraryScreen = () => {
    const navigation = useNavigation();
    const { data = [], isLoading, error } = useQuery({
        queryKey: ['library'],
        queryFn: getLibraryInfo,
    });

    return (
        <View style={styles.libraryContainer}>
            <View style={styles.titleContainer}>
                <Image source={bookOpened} style={styles.bookOpened} />
                <Text style={commonStyles.titleText}>내 라이브러리</Text>
            </View>
            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator
                        size='large'
                        color={commonColors.purple}
                    />
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.messageText}>
                        {error?.message || '서재 정보를 불러오지 못했습니다.'}
                    </Text>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                >
                    {data.length === 0 ? (
                        <Text style={styles.messageText}>
                            북마크한 책이 없습니다.
                        </Text>
                    ) : (
                        data.map((item, index) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('BookScreen', {
                                        bookId: item?.book_id ?? item?.id,
                                    });
                                }}
                                key={item?.book_id ?? item?.id ?? index}
                            >
                                <BookListItem data={item} />
                            </Pressable>
                        ))
                    )}
                </ScrollView>
            )}
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 35,
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
    },
});

export default LibraryScreen;
