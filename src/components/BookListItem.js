import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions,
} from 'react-native';
import React from 'react';

import {
    getAuthorAndTranslator,
    getDateString,
    normalizeBookData,
} from '../utils';
import commonStyles from '../../assets/styles/commonStyles';
import commonColors from '../../assets/colors/commonColors';

const BookListItem = ({ data }) => {
    const { width } = useWindowDimensions();
    const book = normalizeBookData(data);
    const isCompactScreen = width < 390;
    const title =
        typeof book?.title === 'string' && book.title.trim() !== ''
            ? book.title.trim()
            : '제목 없음';
    const authorText = getAuthorAndTranslator(book?.author, book?.translator);
    const bookmarkCount = book?.bookmark_num ?? book?.bookmarkNum ?? 0;
    const isBookmarked =
        book?.isBookmarked === true || book?.isBookmarked === 'true';

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
                    <Image
                        source={
                            isBookmarked
                                ? require('../../assets/icons/bookmarkIconFill.png')
                                : require('../../assets/icons/bookmarkIcon.png')
                        }
                        style={styles.bookmarkIcon}
                    />
                    <Text
                        style={styles.bookmarkText}
                    >{`북마크 ${bookmarkCount}회`}</Text>
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
