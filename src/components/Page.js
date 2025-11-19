import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const padding = 30;
const gap = 15;
const columns = 3;
const pageWidth = (screenWidth - padding * 2 - gap * (columns - 1)) / columns;

export default function Page({ page, content }) {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.page}>
                <Text style={styles.text}>{content}</Text>
            </View>
            <Text>{page}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        width: pageWidth,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    page: {
        width: '100%',
        height: pageWidth * 1.8,
        backgroundColor: 'white',
        padding: 8,
    },
    text: {
        fontSize: 3,
        lineHeight: 6,
    },
});
