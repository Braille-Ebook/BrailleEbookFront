import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute, useFocusEffect } from '@react-navigation/native';

import PdfBar from '../components/PdfBar';
import PdfPage from '../components/PdfPage';
import BookmarkedPage from '../components/BookmarkedPage';
import { getLastPosition, getPdfPage, postLastPosition } from '../api/_index';

export default function PdfScreen() {
    const route = useRoute();
    /*const { bookId } = route.params;*/
    const positionQuery = useQuery({
        queryKey: ['pagePosition', '/*bookId*/'],
        queryFn: () => getLastPosition({ bookId: '/*bookId*/' }),
    });
    const contentQuery = useQuery({
        queryKey: ['pageContent', '/*bookId*/', currentPage],
        queryFn: () => getPdfPage({ bookId: '/*bookId*/', page: '/*page*/' }),
        //enabled: !!positionQuery.data?.page
    });
    const mutation = useMutation({
        mutationFn: ({ bookId, position }) =>
            postLastPosition({ bookId, position }),
        onSuccess: () => {},
    });

    const totalPage = 6;
    //positionQuery.data에서 데이터 받아 초기값 설정
    const [currentChar, setCurrentChar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

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
                mutation.mutate({
                    bookId: '/*bookId*/',
                    position: { lastPage: currentPage, lastChar: currentChar },
                });
            };
        }, [])
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.pdfScreen}>
                <PdfBar
                    setOpen={setIsMenuOpen}
                    bookmark={isBookmarked}
                    setBookmark={setIsBookmarked}
                />
                {!isMenuOpen ? (
                    <GestureDetector gesture={panGesture}>
                        <View style={{ flex: 1 }}>
                            <PdfPage
                                currentPage={currentPage}
                                totalPage={totalPage}
                                char={currentChar}
                                setChar={setCurrentChar}
                            />
                        </View>
                    </GestureDetector>
                ) : (
                    <BookmarkedPage
                        bookId={'/*bookId*/'}
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
});
