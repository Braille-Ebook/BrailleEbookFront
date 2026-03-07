import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';

import { getAuthorAndTranslator, getDateString } from '../utils';
import commonStyles from '../../assets/styles/commonStyles';

const BookListItem = ({ data }) => {
    const title = typeof data?.title === 'string' ? data.title.trim() : '제목 없음';
    const authorText = getAuthorAndTranslator(data?.author, data?.translator);
    const bookmarkCount = data?.bookmark_num ?? data?.bookmarkNum ?? 0;

    return (
        <View style={styles.bookContainer}>
            <Image
                source={
                    data?.image_url
                        ? { uri: data.image_url }
                        : require('../../assets/images/littleRedRidingHood.png')
                }
                style={styles.bookImage}
            />
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={[commonStyles.subtitleText, styles.title]}>
                            {title}
                        </Text>
                    </View>

                    {authorText !== '' && <Text>{authorText}</Text>}
                    <Text>{getDateString(data?.publish_date)}</Text>

                    <View style={styles.bookmarkContainer}>
                        <Image
                            source={
                                data?.isBookmarked
                                    ? require('../../assets/icons/bookmarkIconFill.png')
                                    : require('../../assets/icons/bookmarkIcon.png')
                            }
                        />
                        <Text>{`북마크 ${bookmarkCount}`}</Text>
                    </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingVertical: 6,
    },
    bookImage: {
        width: 120,
        height: 150,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        paddingRight: 50,
    },
    titleContainer: {
        flexShrink: 1,
    },
    title: {
        flexShrink: 1,
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});

export default BookListItem;
