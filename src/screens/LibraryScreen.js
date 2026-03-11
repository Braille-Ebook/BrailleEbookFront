import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    ActivityIndicator,
    useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookListItem } from '../components';
import { bookOpened } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';
import { normalizeBookData } from '../utils';

import { getLibraryInfo } from '../api';

const LibraryScreen = () => {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const {
        data = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['library'],
        queryFn: getLibraryInfo,
    });
    const books = data.map((item) => {
        const book = normalizeBookData(item);
        return {
            ...book,
            isBookmarked: true,
        };
    });
    const isCompactScreen = width < 390;

    return (
        <SafeAreaView style={styles.libraryContainer}>
            <View style={styles.titleContainer}>
                <Image
                    source={bookOpened}
                    style={[
                        styles.bookOpened,
                        isCompactScreen && styles.compactBookOpened,
                    ]}
                />
                <Text
                    style={[
                        commonStyles.titleText,
                        styles.titleText,
                        isCompactScreen && styles.compactTitleText,
                    ]}
                >
                    내 라이브러리
                </Text>
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
                    contentContainerStyle={styles.scrollContent}
                >
                    {books.length === 0 ? (
                        <Text style={styles.messageText}>
                            북마크한 책이 없습니다.
                        </Text>
                    ) : (
                        books.map((item, index) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('BookScreen', {
                                        bookId: item?.book_id ?? item?.id,
                                    });
                                }}
                                key={item?.book_id ?? item?.id ?? index}
                                style={styles.itemPressable}
                            >
                                <BookListItem data={item} />
                            </Pressable>
                        ))
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    libraryContainer: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    bookOpened: {
        marginRight: 16,
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    compactBookOpened: {
        width: 32,
        height: 32,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
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
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    titleText: {
        fontWeight: '700',
        textAlign: 'center',
    },
    compactTitleText: {
        fontSize: 22,
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
    },
    itemPressable: {
        width: '100%',
    },
});

export default LibraryScreen;
