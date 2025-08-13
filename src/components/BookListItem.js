import { StyleSheet, View, Text, Image } from 'react-native';
import React from 'react';

import { getAuthorAndTranslator, getDateString } from '../utils';
import { bookmarkIcon, bookmarkIconFill } from '../../assets/icons';
import commonStyles from '../../assets/styles/commonStyles';

//책 사진까지 있는 List Item
const BookListItem = ({ data }) => {
    return (
        <View style={styles.bookContainer}>
            <Image
                source={require('../../assets/images/littleRedRidingHood.png')}
                style={styles.bookImage}
            />
            <View>
                <Text style={commonStyles.subtitleText}>{data.title}</Text>
                <Text>
                    {getAuthorAndTranslator(data.author, data.translator)}
                </Text>
                <Text>{getDateString(data.publishDate)}</Text>

                <View style={styles.bookmarkContainer}>
                    <Image
                        source={
                            data.isBookmarked ? bookmarkIconFill : bookmarkIcon
                        }
                    />
                    <Text>{`북마크 ${data.bookmarkNum}`}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: 'row',
        paddingHorizontal: 36,
        marginBottom: 10,
    },
    bookImage: {
        marginRight: 15,
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default BookListItem;
