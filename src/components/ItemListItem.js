import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React from 'react';

import { bookmarkIcon, bookmarkIconFill } from '../../assets/icons';

const ItemListItem = ({ title, body, bookmark }) => {
    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {body.map((item, index) => (
                    <Text
                        key={index}
                        style={[styles.bodyText, ...item.styles]}
                        numberOfLines={item.text.length > 50 ? 2 : undefined}
                    >
                        {item.text}
                    </Text>
                ))}
            </View>
            <Image
                source={bookmark.isBookmarked ? bookmarkIcon : bookmarkIconFill}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    bodyText: {
        width: Dimensions.get('window').width * 0.6,
        flexWrap: 'wrap',
    },
});

export default ItemListItem;
