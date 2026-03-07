import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { ItemListItem } from '../components';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import { getMypageReviews } from '../api';

const MyReviewsScreen = () => {
    const navigation = useNavigation();
    const { data = [], isLoading, error } = useQuery({
        queryKey: ['myPageReviews'],
        queryFn: getMypageReviews,
    });
    return (
        <View style={styles.myReviewsScreen}>
            <Text style={[commonStyles.titleText, styles.titleText]}>
                내가 쓴 리뷰
            </Text>
            {isLoading ? (
                <ActivityIndicator size='large' color={commonColors.purple} />
            ) : error ? (
                <Text style={styles.messageText}>
                    {error?.message || '리뷰 정보를 불러오지 못했습니다.'}
                </Text>
            ) : (
                <ScrollView>
                    {data.length === 0 ? (
                        <Text style={styles.messageText}>
                            아직 작성한 리뷰가 없습니다.
                        </Text>
                    ) : (
                        data.map((item, index) => (
                            <Pressable
                                key={item?.reviewId ?? item?.id ?? index}
                                onPress={() => {
                                    if (item?.bookId ?? item?.book_id) {
                                        navigation.navigate('ReviewScreen', {
                                            bookId:
                                                item?.bookId ?? item?.book_id,
                                        });
                                    }
                                }}
                            >
                                <ItemListItem
                                    title={
                                        item?.title ??
                                        item?.bookTitle ??
                                        '내가 쓴 리뷰'
                                    }
                                    body={[
                                        {
                                            text:
                                                item?.author ||
                                                item?.nickname ||
                                                '작성자 정보 없음',
                                            styles: [commonStyles.smallText],
                                        },
                                        {
                                            text:
                                                item?.content ||
                                                '리뷰 내용이 없습니다.',
                                            styles: [
                                                commonStyles.smallText,
                                                styles.content,
                                            ],
                                        },
                                    ]}
                                    bookmark={{
                                        isBookmarked:
                                            item?.isBookmarked ??
                                            item?.isLiked ??
                                            false,
                                    }}
                                />
                            </Pressable>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    myReviewsScreen: { paddingHorizontal: 36 },
    titleText: { marginVertical: 20 },
    content: {
        color: commonColors.lightPurple,
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MyReviewsScreen;
