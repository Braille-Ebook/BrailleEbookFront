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
