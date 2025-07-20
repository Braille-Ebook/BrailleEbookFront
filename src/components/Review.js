import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const Review = ({ data }) => {
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.nickname}>{data.nickname}</Text>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.content}>{data.content}</Text>
                    <Text
                        style={commonStyles.smallText}
                    >{`좋아요 ${data.likeNum}개`}</Text>
                </View>
                <Image
                    source={
                        data.isLiked
                            ? require('../../assets/icons/thumbFill.png')
                            : require('../../assets/icons/thumb.png')
                    }
                    style={styles.icon}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        marginBottom: 20,
    },
    nickname: {
        color: commonColors.lightPurple,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {},
    content: {
        marginVertical: 5,
    },
});

export default Review;
