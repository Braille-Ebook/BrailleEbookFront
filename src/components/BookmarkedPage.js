import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import Page from './Page';
import { bookContentData } from '../../assets/dummy';

export default function BookmarkedPage() {
    return (
        <View style={styles.bookmarkedPage}>
            <Text style={styles.text}>저장된 페이지</Text>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.pagesContainer}>
                    {Array(10)
                        .fill(bookContentData)
                        .map((p, i) => (
                            <View style={styles.pageContainer}>
                                <Page
                                    key={i}
                                    page={p.page}
                                    content={p.content}
                                />
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    bookmarkedPage: {
        flex: 1,
        padding: 30,
        backgroundColor: 'rgb(143,143,143)',
    },
    text: {
        fontWeight: 700,
    },
    pagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
