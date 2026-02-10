import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Page from './Page';
import { bookContentData } from '../../assets/dummy';
import { getPageBookmarks } from '../api/_index';

export default function BookmarkedPage({
    bookId,
    setIsMenuOpen,
    setCurrentPage,
    setCurrentChar,
}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['bookmarkedPage', bookId],
        queryFn: () => getPageBookmarks({ bookId }),
    });
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
                            <Pressable
                                onPress={() => {
                                    //setCurrentPage(p.page);
                                    setCurrentChar(0);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <View key={i} style={styles.pageContainer}>
                                    <Page page={p.page} content={p.content} />
                                </View>
                            </Pressable>
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
