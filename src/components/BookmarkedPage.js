import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Page from './Page';
import commonColors from '../../assets/colors/commonColors';
import { getPageBookmarks } from '../api';

export default function BookmarkedPage({
    bookId,
    setIsMenuOpen,
    setCurrentPage,
    setCurrentChar,
}) {
    const { data = [], isLoading, error } = useQuery({
        queryKey: ['bookmarkedPage', bookId],
        queryFn: () => getPageBookmarks({ bookId }),
        enabled: !!bookId,
    });

    return (
        <View style={styles.bookmarkedPage}>
            <Text style={styles.text}>저장된 페이지</Text>
            {isLoading ? (
                <Text style={styles.stateText}>
                    북마크 페이지를 불러오는 중입니다.
                </Text>
            ) : error ? (
                <Text style={styles.stateText}>
                    {error?.message || '북마크 페이지를 불러오지 못했습니다.'}
                </Text>
            ) : (
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.pagesContainer}>
                        {data.length === 0 ? (
                            <Text style={styles.stateText}>
                                저장된 페이지가 없습니다.
                            </Text>
                        ) : (
                            data.map((item, index) => {
                                const pageNumber =
                                    item?.page ?? item?.pageNumber ?? index + 1;
                                const contentPreview =
                                    item?.content ?? item?.text ?? '';

                                return (
                                    <Pressable
                                        key={
                                            item?.id ??
                                            `${pageNumber}-${index}`
                                        }
                                        onPress={() => {
                                            setCurrentPage(pageNumber);
                                            setCurrentChar(0);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <View style={styles.pageContainer}>
                                            <Page
                                                page={pageNumber}
                                                content={contentPreview}
                                            />
                                        </View>
                                    </Pressable>
                                );
                            })
                        )}
                    </View>
                </ScrollView>
            )}
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
        fontWeight: '700',
    },
    pagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    stateText: {
        color: commonColors.white,
        marginTop: 16,
    },
    pageContainer: {
        marginTop: 8,
    },
});
