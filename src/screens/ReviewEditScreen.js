import {
    View,
    Image,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import { React, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { send } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import ScreenHeader from '../components/ScreenHeader';

import { patchReviews } from '../api';

const ReviewEditScreen = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const route = useRoute();
    const orgText = route.params?.orgText ?? '';
    const bookId = route.params?.bookId;
    const reviewId = route.params?.reviewId;
    const [text, setText] = useState(orgText);

    /*
    보통 orgText를 꺼내는 방식이 query cache에서 이미 불렀는 데이터를 찾는거라고 한다.
    const queryClient = useQueryClient();

    const reviews = queryClient.getQueryData(['bookReviews', bookId]);
    const review = reviews?.find(r => r.id === reviewId);

    const [text, setText] = useState(review?.content ?? '');
    */
    const mutation = useMutation({
        mutationFn: ({
            bookId: targetBookId,
            reviewId: targetReviewId,
            content,
        }) =>
            patchReviews({
                bookId: targetBookId,
                reviewId: targetReviewId,
                body: { content },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
            navigation.goBack();
        },
    });

    const handleSubmit = () => {
        if (!text.trim()) return;
        mutation.mutate({ bookId, reviewId, content: text });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScreenHeader
                fallbackRoute={{ name: 'ReviewScreen', params: { bookId } }}
                title='리뷰 편집'
                right={
                    <Pressable
                        disabled={mutation.isPending}
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        <Image source={send} style={styles.icon} />
                    </Pressable>
                }
            />
            <View style={styles.reviewEditScreen}>
                <TextInput
                    multiline={true}
                    value={text}
                    onChangeText={setText}
                    style={styles.textInput}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    reviewEditScreen: {
        flex: 1,
        paddingHorizontal: 42,
        paddingTop: 12,
        paddingBottom: 20,
    },
    icon: {
        width: 20,
        height: 20,
    },
    submitButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        width: '100%',
        textAlignVertical: 'top',
    },
});

export default ReviewEditScreen;
