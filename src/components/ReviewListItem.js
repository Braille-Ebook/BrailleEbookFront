import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { edit, thumb, thumbFill } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';
import { likeReviews } from '../api';

//댓글 모양의 리뷰 리스트 아이템
const ReviewListItem = ({ data, bookId }) => {
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const reviewId = data?.review_id ?? data?.id;
    const isEditable = data?.isLiked == null;
    const likeCount = data?.like_count ?? 0;

    const mutation = useMutation({
        mutationFn: () => likeReviews({ bookId, reviewId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookReviews', bookId],
            });
        },
    });
    return (
        <View style={styles.reviewContainer}>
            <Text style={styles.nickname}>
                {data?.nickname ?? data?.user?.nickname ?? '익명'}
            </Text>
            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.content}>{data?.content ?? ''}</Text>
                    <Text
                        style={commonStyles.smallText}
                    >{`좋아요 ${likeCount}개`}</Text>
                </View>

                <Pressable
                    disabled={mutation.isPending || !reviewId}
                    onPress={() => {
                        if (isEditable) {
                            navigation.navigate('ReviewEditScreen', {
                                orgText: data?.content ?? '',
                                bookId,
                                reviewId,
                            });
                        } else {
                            mutation.mutate();
                        }
                    }}
                >
                    <Image
                        source={
                            isEditable
                                ? edit
                                : data?.isLiked
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
        color: commonColors.purple,
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
