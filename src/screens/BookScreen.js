import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAuthorAndTranslator, getDateString } from '../utils';
import { bookmarkIcon, bookmarkIconFill } from '../../assets/icons';
import commonStyles from '../../assets/styles/commonStyles';
import commonColors from '../../assets/colors/commonColors';
import ScreenHeader from '../components/ScreenHeader';
import { getBookById, toggleBookBookmark } from '../api/bookApi';

const BookScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const queryClient = useQueryClient();
    const bookId = route.params?.bookId;
    const { data, isLoading, error } = useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getBookById(bookId),
        enabled: !!bookId,
    });
    const bookmarkMutation = useMutation({
        mutationFn: () => toggleBookBookmark(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book', bookId] });
            queryClient.invalidateQueries({ queryKey: ['library'] });
        },
    });

    const openPdf = (startFromBeginning = false) => {
        if (!data.pdf_url) {
            Alert.alert('알림', '이 책은 아직 본문이 등록되지 않았습니다.');
            return;
        }

        navigation.navigate('PdfScreen', {
            bookId,
            startFromBeginning,
        });
    };

    const handleBookmarkToggle = async () => {
        try {
            await bookmarkMutation.mutateAsync();
        } catch (bookmarkError) {
            Alert.alert(
                '알림',
                bookmarkError?.message || '북마크 처리에 실패했습니다.'
            );
        }
    };

    const renderContent = () => {
        if (!bookId) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.messageText}>
                        책 정보를 찾을 수 없습니다.
                    </Text>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator
                        size='large'
                        color={commonColors.purple}
                    />
                </View>
            );
        }

        if (error || !data) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.messageText}>
                        {error?.message || '책 상세 정보를 불러오지 못했습니다.'}
                    </Text>
                </View>
            );
        }

        const authorText = getAuthorAndTranslator(data.author, data.translator);
        const isBookmarked =
            data.isBookmarked ??
            (data.bookmark_num ?? data.bookmarkNum ?? 0) > 0;
        const summary =
            typeof data.summary === 'string' && data.summary.trim() !== ''
                ? data.summary
                : '줄거리 정보가 없습니다.';

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bookContainer}>
                    <Image
                        source={
                            data.image_url
                                ? { uri: data.image_url }
                                : require('../../assets/images/littleRedRidingHood.png')
                        }
                        style={styles.image}
                    />
                    <View style={styles.detailContainer}>
                        <Text style={[commonStyles.titleText, styles.title]}>
                            {data.title}
                        </Text>
                        {authorText !== '' && (
                            <Text style={styles.contentText}>{authorText}</Text>
                        )}
                        <Text style={styles.contentText}>
                            {data.publisher || '출판사 정보 없음'}
                        </Text>
                        <Text style={styles.contentText}>
                            {getDateString(data.publish_date)}
                        </Text>
                        <View style={styles.bookmarkContainer}>
                            <Pressable
                                onPress={handleBookmarkToggle}
                                disabled={bookmarkMutation.isPending}
                            >
                                <Image
                                    source={
                                        isBookmarked
                                            ? bookmarkIconFill
                                            : bookmarkIcon
                                    }
                                />
                            </Pressable>
                            <Text>{`북마크 ${data.bookmark_num ?? 0}회`}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={() => openPdf(true)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        처음부터 읽기
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => openPdf(false)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        이어 읽기
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomScreenContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                            리뷰
                        </Text>
                        <Text style={styles.contentText}>
                            리뷰는 전체 목록 화면에서 불러옵니다.
                        </Text>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('ReviewScreen', { bookId });
                            }}
                        >
                            <Text
                                style={[commonStyles.smallText, styles.more]}
                            >{`> 리뷰 보러 가기`}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                            줄거리
                        </Text>
                        <Text>{summary}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                            기본정보
                        </Text>
                        <View style={styles.tableRow}>
                            <Text style={styles.column1}>장르</Text>
                            <Text style={styles.column2}>
                                {data.genre || '정보 없음'}
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.column1}>ISBN</Text>
                            <Text style={styles.column2}>
                                {data.ISBN || data.isbn || '-'}
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.column1}>발행(출시)일자</Text>
                            <Text style={styles.column2}>
                                {getDateString(data.publish_date)}
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.column1}>쪽수</Text>
                            <Text style={styles.column2}>
                                {data.length ? `${data.length}쪽` : '-'}
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.column1}>PDF 제공 여부</Text>
                            <Text style={styles.column2}>
                                {data.pdf_url ? '제공' : '미제공'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScreenHeader fallbackRoute='Bottom' title='도서 상세' />
            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    bookContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 45,
    },
    image: {
        width: 200,
        height: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 6,
    },
    detailContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },
    contentText: {
        textAlign: 'center',
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
    },
    button: {
        width: 100,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        marginHorizontal: 2,
    },
    bottomScreenContainer: {
        paddingHorizontal: 42,
    },
    contentContainer: {
        marginVertical: 10,
    },
    subtitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    more: {
        color: commonColors.lightGrey,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    column1: {
        fontWeight: 'bold',
        width: '50%',
    },
    column2: { width: '50%' },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
    },
});

export default BookScreen;
