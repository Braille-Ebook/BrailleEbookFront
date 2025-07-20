import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import commonStyles from '../../assets/styles/commonStyles';

const Book = ({ data }) => {
    return (
        <View style={styles.bookContainer}>
            <Image
                source={require('../../assets/images/littleRedRidingHood.png')}
                style={styles.bookImage}
            />
            <View>
                <Text style={commonStyles.subtitleText}>{data.title}</Text>
                <Text>
                    {data.translator
                        ? `${data.author} 글, ${data.translator} 번역`
                        : `${data.author} 글`}
                </Text>
                <Text>{`${data.publishDate.getFullYear()}.${
                    data.publishDate.getMonth() + 1
                }.${data.publishDate.getDate()}`}</Text>

                <View style={styles.bookmarkContainer}>
                    <Pressable>
                        <Image
                            source={
                                data.isBookmarked
                                    ? require('../../assets/icons/bookmarkIconFill.png')
                                    : require('../../assets/icons/bookmarkIcon.png')
                            }
                        />
                    </Pressable>

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

export default Book;
