import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export default function PdfPage({
    currentPage,
    totalPage,
    char,
    setChar,
    content,
}) {
    const safeContent =
        typeof content === 'string' && content.length > 0
            ? content
            : '본문 정보가 없습니다.';
    const highlightNthChar = (n) => {
        const targetIndex = Number.isInteger(n) ? n : 0;
        const clampedIndex = Math.min(
            Math.max(targetIndex, 0),
            safeContent.length - 1
        );
        const before = safeContent.slice(0, clampedIndex);
        const target = safeContent[clampedIndex];
        const after = safeContent.slice(clampedIndex + 1);
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
        if (!safeContent.length) return;

        if (locationX > screenWidth / 2) {
            setChar((prev) => Math.min(prev + 1, safeContent.length - 1));
        } else {
            setChar((prev) => Math.max(prev - 1, 0));
        }
    };
    return (
        <Pressable style={styles.pdfPage} onPress={handlePress}>
            <ScrollView style={{ flex: 1 }}>
                <View>{highlightNthChar(char)}</View>
            </ScrollView>
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
