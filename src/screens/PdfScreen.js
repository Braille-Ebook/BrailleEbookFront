import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import PdfBar from '../components/PdfBar';
import PdfPage from '../components/PdfPage';
import BookmarkedPage from '../components/BookmarkedPage';

export default function PdfScreen() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    return (
        <View style={styles.pdfScreen}>
            <PdfBar
                setOpen={setIsMenuOpen}
                bookmark={isBookmarked}
                setBookmark={setIsBookmarked}
            />
            {!isMenuOpen ? (
                <PdfPage currentPage={1} totalPage={6} />
            ) : (
                <BookmarkedPage />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pdfScreen: {
        flex: 1,
        flexDirection: 'column',
    },
});
