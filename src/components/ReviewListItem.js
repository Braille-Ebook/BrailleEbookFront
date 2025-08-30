import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { edit, thumb, thumbFill } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

//댓글 모양의 리뷰 리스트 아이템
const ReviewListItem = ({ data }) => {
    const navigation = useNavigation();
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

                <Pressable
                    onPress={() => {
                        if (data.isLiked == null)
                            navigation.navigate('ReviewEditScreen', {
                                orgText: data.content,
                            });
                    }}
                >
                    <Image
                        source={
                            data.isLiked == null
                                ? edit
                                : data.isLiked
                                ? thumbFill
                                : thumb
                        }
                        style={styles.icon}
                    />
                </Pressable>
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
    icon: {
        width: 25,
        height: 25,
    },
});

export default ReviewListItem;
