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
} from 'react-native';
import { React, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';

import { ReviewListItem, CommentInputBar } from '../components';
import { reviewDummyData } from '../../assets/dummy';
import commonStyles from '../../assets/styles/commonStyles';

import { getReviews, postReviews } from '../api';

const ReviewScreen = () => {
    const route = useRoute();
    /*const {bookId} = route.params;*/

    const [text, onChangeText] = useState('');
    const { realData, isLoading, error } = useQuery({
        queryKey: ['bookReviews', '/*bookId*/'],
        queryFn: getReviews,
    });

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
                        <ScrollView contentContainerStyle={styles.scroll}>
                            {reviewDummyData.map((data, idx) => (
                                <ReviewListItem key={idx} data={data} />
                            ))}
                        </ScrollView>
                    </View>
                    <CommentInputBar
                        text={text}
                        onChangeText={onChangeText}
                        placeholder={'댓글을 입력하세요.'}
                        onSubmit={(content) =>
                            postReviews({ bookId: '/*bookId*/', content })
                        }
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
});

export default ReviewScreen;
