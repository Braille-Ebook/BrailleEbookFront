import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    useRoute,
    useFocusEffect,
    useNavigation,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PdfBar from '../components/PdfBar';
import PdfPage from '../components/PdfPage';
import BookmarkedPage from '../components/BookmarkedPage';
import commonColors from '../../assets/colors/commonColors';
import { getLastPosition, getPdfData, postLastPosition } from '../api';
//import { connectUSB, disconnectUSB, sendDataThroughUSB } from '../utils';

export default function PdfScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const bookId = route.params?.bookId;

    const [currentChar, setCurrentChar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    //const [isUsbConnected, setIsUsbConnected] = useState(false);
    const lastSentPositionRef = useRef('');

    //USB 연결 & 연결 끊기
    /*useEffect(() => {
        let isMounted = true;

        const initUSB = async () => {
            const connected = await connectUSB();
            if (isMounted) {
                setIsUsbConnected(connected);
            }
        };

        initUSB();
        return () => {
            isMounted = false;
            disconnectUSB();
        };
    }, []);*/

    //1. 데이터 처리
    //최근 위치 저장할 ref
    const positionRef = useRef({ page: 1, char: 0 });
    useEffect(() => {
        positionRef.current = {
            page: currentPage,
            char: currentChar,
        };
    }, [currentPage, currentChar]); //state 바뀔때마다 ref내용 업뎃

    //유저의 최근 위치 불러오고 저장하기
    const positionQuery = useQuery({
        queryKey: ['pagePosition', bookId],
        queryFn: () => getLastPosition({ bookId }),
        enabled: !!bookId,
        refetchOnMount: 'always',
    });
    useEffect(() => {
        if (!positionQuery.data) return;

        const lastPage = Number(positionQuery.data.last_page);
        const lastChar = Number(positionQuery.data.last_char);

        if (Number.isFinite(lastPage) && lastPage > 0) {
            setCurrentPage(lastPage);
        }

        if (Number.isFinite(lastChar) && lastChar >= 0) {
            setCurrentChar(lastChar);
        }
    }, [positionQuery.data]);

    //유저가 읽어야할 pdf 페이지 불러오기
    const contentQuery = useQuery({
        queryKey: ['pageContent', bookId, currentPage],
        queryFn: () => getPdfData({ bookId, page: currentPage }),
        enabled: !!bookId && positionQuery.isSuccess,
    });

    //pdf 화면 나가면 책 위치 저장
    const exitPdfMutation = useMutation({
        mutationFn: ({ bookId, position }) =>
            postLastPosition({ bookId, position }),
    });
    useFocusEffect(
        useCallback(() => {
            positionQuery.refetch();
            return () => {
                if (bookId) {
                    const { page, char } = positionRef.current;

                    exitPdfMutation.mutate({
                        bookId,
                        position: {
                            lastPage: page,
                            lastChar: char,
                        },
                    });
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [bookId])
    );
    const pageContent = contentQuery.data?.text;
    const totalPage = contentQuery.data?.pages_num;

    useEffect(() => {
        //if (!isUsbConnected) return;
        if (typeof pageContent !== 'string' || !pageContent.length) return;

        const safeIndex = Math.min(
            Math.max(Number.isInteger(currentChar) ? currentChar : 0, 0),
            pageContent.length - 1
        );

        if (safeIndex !== currentChar) {
            setCurrentChar(safeIndex);
            return;
        }

        const positionKey = `${currentPage}:${safeIndex}:${pageContent[safeIndex]}`;
        if (lastSentPositionRef.current === positionKey) {
            return;
        }

        lastSentPositionRef.current = positionKey;
        //sendDataThroughUSB(pageContent[safeIndex]);
    }, [ pageContent, currentChar, currentPage]);

    //2. 이벤트 핸들러
    const panGesture = Gesture.Pan().onEnd((event) => {
        const { translationX } = event;

        // Swipe left → next page
        if (translationX < -50) {
            setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev));
            setCurrentChar(0);
        }
        // Swipe right → previous page
        else if (translationX > 50) {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
            setCurrentChar(0);
        }
    });

    if (!bookId) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.messageText}>
                    본문을 불러올 책 정보가 없습니다.
                </Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={styles.flexFill}>
            <SafeAreaView
                style={styles.safeArea}
                edges={['top', 'left', 'right']}
            >
                <View style={styles.pdfScreen}>
                    <PdfBar
                        onPressBack={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                                return;
                            }

                            navigation.navigate('BookScreen', { bookId });
                        }}
                        setOpen={setIsMenuOpen}
                        bookmark={isBookmarked}
                        setBookmark={setIsBookmarked}
                    />
                    {!isMenuOpen ? (
                        <GestureDetector gesture={panGesture}>
                            <View style={styles.flexFill}>
                                {contentQuery.isLoading ? (
                                    <View style={styles.centerContainer}>
                                        <ActivityIndicator
                                            size='large'
                                            color={commonColors.purple}
                                        />
                                    </View>
                                ) : contentQuery.error ? (
                                    <View style={styles.centerContainer}>
                                        <Text style={styles.messageText}>
                                            {contentQuery.error?.message ||
                                                '본문을 불러오지 못했습니다.'}
                                        </Text>
                                    </View>
                                ) : (
                                    <PdfPage
                                        currentPage={currentPage}
                                        totalPage={totalPage}
                                        char={currentChar}
                                        setChar={setCurrentChar}
                                        content={pageContent}
                                    />
                                )}
                            </View>
                        </GestureDetector>
                    ) : (
                        <BookmarkedPage
                            bookId={bookId}
                            setIsMenuOpen={setIsMenuOpen}
                            setCurrentPage={setCurrentPage}
                            setCurrentChar={setCurrentChar}
                        />
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgb(64,64,64)',
    },
    pdfScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: commonColors.white,
    },
    flexFill: {
        flex: 1,
    },
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
