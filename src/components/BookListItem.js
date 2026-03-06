import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';

import { getAuthorAndTranslator, getDateString } from '../utils';
import commonStyles from '../../assets/styles/commonStyles';

const BookListItem = ({ data }) => {
    return (
        <View style={styles.bookContainer}>
            <Image
                source={
                    data.image_url
                        ? { uri: data.image_url }
                        : require('../../assets/images/littleRedRidingHood.png')
                }
                style={styles.bookImage}
            />
            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[commonStyles.subtitleText, styles.title]}>
                        {data.title.trim()}
                    </Text>
                </View>

                {(data.author || data.translator) && (
                    <Text>
                        {getAuthorAndTranslator(data.author, data.translator)}
                    </Text>
                )}
                <Text>{getDateString(data.publish_date)}</Text>

                <View style={styles.bookmarkContainer}>
                    <Image
                        source={
                            data.isBookmarked
                                ? require('../../assets/icons/bookmarkIconFill.png')
                                : require('../../assets/icons/bookmarkIcon.png')
                        }
                    />
                    <Text>{`북마크 ${data.bookmark_num}`}</Text>
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
    },
});

export default BookListItem;
