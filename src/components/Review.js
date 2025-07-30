import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const Review = ({ data }) => {
    const navigation = useNavigation();
    let thumbIcon;
    if (data.isLiked === null) {
        thumbIcon = (
            <Pressable
                onPress={() =>
                    navigation.navigate('ReviewEditScreen', {
                        orgText: data.content,
                    })
                }
            >
                <Image
                    source={require('../../assets/icons/edit.png')}
                    style={styles.icon}
                />
            </Pressable>
        );
    } else {
        thumbIcon = (
            <Pressable>
                <Image
                    source={
                        data.isLiked
                            ? require('../../assets/icons/thumbFill.png')
                            : require('../../assets/icons/thumb.png')
                    }
                    style={styles.icon}
                />
            </Pressable>
        );
    }
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

                {thumbIcon}
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
    content: {
        marginVertical: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default Review;
