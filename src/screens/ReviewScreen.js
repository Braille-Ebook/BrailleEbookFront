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
} from 'react-native';
import { React, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';

import { ReviewListItem, CommentInputBar } from '../components';
import commonStyles from '../../assets/styles/commonStyles';
import commonColors from '../../assets/colors/commonColors';

import { getReviews, postReviews } from '../api';

const ReviewScreen = () => {
    const route = useRoute();
    const bookId = route.params?.bookId;

    const [text, onChangeText] = useState('');
    const {
        data = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['bookReviews', bookId],
        queryFn: () => getReviews({ bookId }),
        enabled: !!bookId,
    });

    const handleSubmitReview = async (content) => {
        await postReviews({ bookId, body: { content } });
        await refetch();
    };

    if (!bookId) {
        return (
            <SafeAreaView style={styles.safeArea}>
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <View style={styles.reviewContainer}>
                        <Text style={[commonStyles.subtitleText, styles.title]}>
                            리뷰
                        </Text>
                        {isLoading ? (
                            <View style={styles.centerContainer}>
                                <ActivityIndicator
                                    size='large'
                                    color={commonColors.purple}
                                />
                            </View>
                        ) : error ? (
                            <Text style={styles.messageText}>
                                {error?.message || '리뷰를 불러오지 못했습니다.'}
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
    },
    scroll: {
        paddingBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 45,
        marginBottom: 25,
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
