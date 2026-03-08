import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';

import PdfBar from '../components/PdfBar';
import PdfPage from '../components/PdfPage';
import BookmarkedPage from '../components/BookmarkedPage';
import commonColors from '../../assets/colors/commonColors';
import { getLastPosition, getPdfPage, postLastPosition } from '../api';

export default function PdfScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const bookId = route.params?.bookId;
    const startFromBeginning = route.params?.startFromBeginning ?? false;
    const [currentChar, setCurrentChar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const positionQuery = useQuery({
        queryKey: ['pagePosition', bookId],
        queryFn: () => getLastPosition({ bookId }),
        enabled: !!bookId && !startFromBeginning,
    });
    const contentQuery = useQuery({
        queryKey: ['pageContent', bookId, currentPage],
        queryFn: () => getPdfPage({ bookId, page: currentPage }),
        enabled: !!bookId,
    });
    const mutation = useMutation({
        mutationFn: ({ bookId: targetBookId, position }) =>
            postLastPosition({ bookId: targetBookId, position }),
        onSuccess: () => {},
    });

    useEffect(() => {
        if (startFromBeginning) {
            setCurrentPage(1);
            setCurrentChar(0);
            return;
        }

        if (!positionQuery.data) {
            return;
        }

        const savedPage =
            Number(positionQuery.data?.lastPage ?? positionQuery.data?.page) ||
            1;
        const savedChar =
            Number(positionQuery.data?.lastChar ?? positionQuery.data?.char) ||
            0;

        setCurrentPage(savedPage);
        setCurrentChar(savedChar);
    }, [positionQuery.data, startFromBeginning]);

    const pagePayload = contentQuery.data;
    const pageContent =
        typeof pagePayload === 'string'
            ? pagePayload
            : pagePayload?.content ??
              pagePayload?.text ??
              pagePayload?.pageContent ??
              '';
    const totalPage =
        Number(
            pagePayload?.totalPage ??
                pagePayload?.totalPages ??
                pagePayload?.maxPage
        ) || currentPage;

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

    useFocusEffect(
        useCallback(() => {
            return () => {
                if (bookId) {
                    mutation.mutate({
                        bookId,
                        position: {
                            lastPage: currentPage,
                            lastChar: currentChar,
                        },
                    });
                }
            };
        }, [bookId, currentPage, currentChar, mutation])
    );

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
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    pdfScreen: {
        flex: 1,
        flexDirection: 'column',
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
