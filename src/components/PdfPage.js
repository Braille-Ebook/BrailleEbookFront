import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';

import { bookContentData } from '../../assets/dummy';

export default function PdfPage({ currentPage, totalPage, char, setChar }) {
    const content = bookContentData.content;
    const highlightNthChar = (n) => {
        const before = content.slice(0, n);
        const target = content[n];
        const after = content.slice(n + 1);
        return (
            <Text style={styles.text}>
                {before}
                <Text style={styles.highlight}>{target}</Text>
                {after}
            </Text>
        );
    };
    const handlePress = (e) => {
        const { locationX } = e.nativeEvent;
        const screenWidth = Dimensions.get('window').width;

        if (locationX > screenWidth / 2) {
            setChar((prev) => Math.min(prev + 1, content.length - 1));
        } else {
            setChar((prev) => Math.max(prev - 1, 0));
        }
    };
    return (
        <Pressable style={styles.pdfPage} onPress={handlePress}>
            <View>{highlightNthChar(char)}</View>
            <View>
                <Text style={styles.page}>
                    {currentPage}/{totalPage}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pdfPage: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        lineHeight: 30,
    },
    highlight: {
        backgroundColor: 'yellow',
        color: 'black',
        fontWeight: 'bold',
    },
});
