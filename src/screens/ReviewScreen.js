import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Pressable,
} from 'react-native';
import { React, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';

import { ReviewListItem, CommentInputBar } from '../components';
import commonColors from '../../assets/colors/commonColors';
import ScreenHeader from '../components/ScreenHeader';

import { getReviews, postReviews } from '../api';

const ReviewScreen = () => {
    const route = useRoute();
    const queryClient = useQueryClient();
    const bookId = route.params?.bookId;

    const [text, onChangeText] = useState('');

    //리뷰 데이터 받기
    const {
        data = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['bookReviews', bookId],
        queryFn: () => getReviews({ bookId }),
        enabled: !!bookId,
    });

    //새 리뷰 포스트
    const postReviewMutation = useMutation({
        mutationFn: (content) => postReviews({ bookId, body: { content } }),
        onSuccess: () => {
            //관련 데이터들 새로 받게 하기
            queryClient.invalidateQueries({
                queryKey: ['bookReviews', bookId],
            });
            queryClient.invalidateQueries({ queryKey: ['myPage'] });
            queryClient.invalidateQueries({ queryKey: ['myPageReviews'] });
        },
    });
    const handleSubmitReview = (content) => {
        postReviewMutation.mutate(content);
    };

    if (!bookId) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScreenHeader fallbackRoute='Bottom' title='리뷰' />
                <View style={styles.centerContainer}>
                    <Text style={styles.messageText}>
                        리뷰를 불러올 책 정보가 없습니다.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScreenHeader
                fallbackRoute={{ name: 'BookScreen', params: { bookId } }}
                title='리뷰'
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <View style={styles.reviewContainer}>
                        {isLoading ? (
                            <View style={styles.centerContainer}>
                                <ActivityIndicator
                                    size='large'
                                    color={commonColors.purple}
                                />
                            </View>
                        ) : error ? (
                            <Text style={styles.messageText}>
                                {error?.message ||
                                    '리뷰를 불러오지 못했습니다.'}
                            </Text>
                        ) : (
                            <ScrollView contentContainerStyle={styles.scroll}>
                                {data.length === 0 ? (
                                    <Text style={styles.messageText}>
                                        아직 작성된 리뷰가 없습니다.
                                    </Text>
                                ) : (
                                    data.map((item, idx) => (
                                        <ReviewListItem
                                            key={
                                                item?.reviewId ??
                                                item?.id ??
                                                idx
                                            }
                                            data={item}
                                            bookId={bookId}
                                        />
                                    ))
                                )}
                            </ScrollView>
                        )}
                    </View>
                    <CommentInputBar
                        text={text}
                        onChangeText={onChangeText}
                        placeholder={'댓글을 입력하세요.'}
                        onSubmit={handleSubmitReview}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    reviewContainer: {
        flex: 1,
        paddingHorizontal: 42,
        paddingTop: 12,
    },
    scroll: {
        paddingBottom: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
    },
});

export default ReviewScreen;
