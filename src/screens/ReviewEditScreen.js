import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import { React, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { send } from '../../assets/icons';
import commonStyles from '../../assets/styles/commonStyles';

import { patchReviews } from '../api/_index';

const ReviewEditScreen = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const route = useRoute();
    const { orgText, bookId, reviewId } = route.params;
    const [text, setText] = useState(orgText);

    /*
    보통 orgText를 꺼내는 방식이 query cache에서 이미 불렀는 데이터를 찾는거라고 한다.
    const queryClient = useQueryClient();

    const reviews = queryClient.getQueryData(['bookReviews', bookId]);
    const review = reviews?.find(r => r.id === reviewId);

    const [text, setText] = useState(review?.content ?? '');
    */
    const mutation = useMutation({
        mutationFn: ({ bookId, reviewId, content }) =>
            patchReviews(bookId, reviewId, content),
        onSuccess: () => {
            queryClient.invalidateQueries(['bookReviews', bookId]);
            navigation.goBack();
        },
    });
    return (
        <View style={styles.reviewEditScreen}>
            <View style={styles.topContainer}>
                <Text style={[commonStyles.subtitleText, styles.title]}>
                    리뷰 편집
                </Text>
                <Pressable
                    disabled={mutation.isPending}
                    onPress={() => {
                        if (!text.trim()) return; //아무것도 없을 시 수정 불가능하게 하기 (후에 toast 만들기)
                        mutation.mutate({ bookId, reviewId, content: text });
                    }}
                >
                    <Image source={send} style={styles.icon} />
                </Pressable>
            </View>
            <TextInput
                multiline={true}
                value={text}
                onChangeText={setText}
                style={styles.textInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewEditScreen: {
        padding: 42,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
    },
    icon: {
        width: 20,
        height: 20,
    },
    textInput: {
        width: '100%',
        textAlignVertical: 'top',
    },
});

export default ReviewEditScreen;
