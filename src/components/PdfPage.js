import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { bookContentData } from '../../assets/dummy';

export default function PdfPage({ currentPage, totalPage }) {
    return (
        <View style={styles.pdfPage}>
            <View>
                <Text style={styles.text}>{bookContentData.content}</Text>
            </View>
            <View>
                <Text style={styles.page}>
                    {currentPage}/{totalPage}
                </Text>
            </View>
        </View>
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
    page: {},
});
