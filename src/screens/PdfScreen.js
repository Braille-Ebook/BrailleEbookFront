import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

import PdfBar from '../components/PdfBar';
import PdfPage from '../components/PdfPage';
import BookmarkedPage from '../components/BookmarkedPage';

export default function PdfScreen() {
    const totalPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const panGesture = Gesture.Pan().onEnd((event) => {
        const { translationX } = event;

        // Swipe left → next page
        if (translationX < -50) {
            setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev));
        }
        // Swipe right → previous page
        else if (translationX > 50) {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
        }
    });

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
                            />
                        </View>
                    </GestureDetector>
                ) : (
                    <BookmarkedPage />
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
