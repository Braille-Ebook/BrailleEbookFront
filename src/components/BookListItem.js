import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getAuthorAndTranslator,
    getBookBookmarkCount,
    getDateString,
    normalizeBookData,
} from '../utils';
import commonStyles from '../../assets/styles/commonStyles';
import commonColors from '../../assets/colors/commonColors';
import { toggleBookBookmark } from '../api/bookApi';

const mergeBookIntoLibrary = (current, nextBook, targetBookId) => {
    const nextBooks = Array.isArray(current) ? current : [];
    const filteredBooks = nextBooks.filter(item => {
        const currentBook = normalizeBookData(item);

        return (currentBook?.book_id ?? currentBook?.id) !== targetBookId;
    });

    return [nextBook, ...filteredBooks];
};

const BookListItem = ({ data }) => {
    const { width } = useWindowDimensions();
    const queryClient = useQueryClient();
    const book = normalizeBookData(data);
    const isCompactScreen = width < 390;
    const bookId = book?.book_id ?? book?.id;
    const title =
        typeof book?.title === 'string' && book.title.trim() !== ''
            ? book.title.trim()
            : '제목 없음';
    const authorText = getAuthorAndTranslator(book?.author, book?.translator);
    const initialIsBookmarked = book?.isBookmarked ?? false;
    const initialBookmarkCount = getBookBookmarkCount(book);
    const defaultBookmarkState = {
        isBookmarked: initialIsBookmarked,
        bookmarkCount: initialBookmarkCount,
    };
    const { data: bookmarkState = defaultBookmarkState } = useQuery({
        queryKey: ['bookBookmarkState', bookId],
        queryFn: () => defaultBookmarkState,
        enabled: !!bookId,
        initialData: defaultBookmarkState,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (!bookId) {
            return;
        }

        if (queryClient.getQueryData(['bookBookmarkState', bookId]) == null) {
            queryClient.setQueryData(['bookBookmarkState', bookId], {
                isBookmarked: initialIsBookmarked,
                bookmarkCount: initialBookmarkCount,
            });
        }
    }, [bookId, initialBookmarkCount, initialIsBookmarked, queryClient]);

    const bookmarkMutation = useMutation({
        mutationFn: () => toggleBookBookmark(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['book', bookId] });
        },
    });

    const handleBookmarkToggle = async event => {
        event.stopPropagation?.();

        if (!bookId || bookmarkMutation.isPending) {
            return;
        }

        const previousBookmarked = bookmarkState.isBookmarked;
        const previousBookmarkCount = bookmarkState.bookmarkCount;
        const previousLibraryData = queryClient.getQueryData(['library']);
        const nextBookmarked = !previousBookmarked;
        const nextBookmarkCount = Math.max(
            previousBookmarkCount + (nextBookmarked ? 1 : -1),
            0
        );

        queryClient.setQueryData(['bookBookmarkState', bookId], {
            isBookmarked: nextBookmarked,
            bookmarkCount: nextBookmarkCount,
        });
        if (nextBookmarked) {
            queryClient.setQueryData(['library'], current =>
                mergeBookIntoLibrary(
                    current,
                    {
                        ...book,
                        isBookmarked: true,
                        bookmark_num: nextBookmarkCount,
                    },
                    bookId
                )
            );
        } else {
            queryClient.setQueryData(['library'], current =>
                Array.isArray(current)
                    ? current.filter(item => {
                          const currentBook = normalizeBookData(item);
                          return (
                              (currentBook?.book_id ?? currentBook?.id) !== bookId
                          );
                      })
                    : current
            );
        }

        try {
            await bookmarkMutation.mutateAsync();
        } catch (bookmarkError) {
            queryClient.setQueryData(['bookBookmarkState', bookId], {
                isBookmarked: previousBookmarked,
                bookmarkCount: previousBookmarkCount,
            });
            queryClient.setQueryData(['library'], previousLibraryData);
            Alert.alert(
                '알림',
                bookmarkError?.message || '북마크 처리에 실패했습니다.'
            );
        }
    };

    return (
        <View style={styles.bookContainer}>
            <Image
                source={
                    book?.image_url
                        ? { uri: book.image_url }
                        : require('../../assets/images/littleRedRidingHood.png')
                }
                style={[
                    styles.bookImage,
                    isCompactScreen && styles.compactBookImage,
                ]}
            />
            <View
                style={[
                    styles.textContainer,
                    isCompactScreen && styles.compactTextContainer,
                ]}
            >
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={2}
                        style={[
                            commonStyles.subtitleText,
                            styles.title,
                            isCompactScreen && styles.compactTitle,
                        ]}
                    >
                        {title}
                    </Text>
                </View>

                {authorText !== '' && (
                    <Text numberOfLines={2} style={styles.metaText}>
                        {authorText}
                    </Text>
                )}
                <Text style={styles.metaText}>
                    {getDateString(book?.publish_date)}
                </Text>

                <View style={styles.bookmarkContainer}>
                    <Pressable
                        onPress={handleBookmarkToggle}
                        disabled={!bookId || bookmarkMutation.isPending}
                    >
                        <Image
                            source={
                                bookmarkState.isBookmarked
                                    ? require('../../assets/icons/bookmarkIconFill.png')
                                    : require('../../assets/icons/bookmarkIcon.png')
                            }
                            style={styles.bookmarkIcon}
                        />
                    </Pressable>
                    <Text
                        style={styles.bookmarkText}
                    >{`북마크 ${bookmarkState.bookmarkCount}회`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 12,
        paddingVertical: 6,
    },
    bookImage: {
        width: '28%',
        minWidth: 88,
        maxWidth: 120,
        aspectRatio: 0.8,
        marginRight: 16,
        borderRadius: 12,
        backgroundColor: commonColors.lightPurple,
    },
    compactBookImage: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        minWidth: 0,
        paddingRight: 16,
    },
    compactTextContainer: {
        paddingRight: 8,
    },
    titleContainer: {
        flexShrink: 1,
    },
    title: {
        flexShrink: 1,
        fontWeight: '700',
        color: commonColors.black,
    },
    compactTitle: {
        fontSize: 15,
    },
    metaText: {
        color: commonColors.darkGrey,
        marginTop: 4,
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 10,
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
    bookmarkText: {
        color: commonColors.darkGrey,
    },
});

export default BookListItem;
