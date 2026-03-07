import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { ItemListItem } from '../components';
import { getTimeAgo } from '../utils';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import { getMypageBooks } from '../api';

const MyBooksScreen = () => {
    const navigation = useNavigation();
    const { data = [], isLoading, error } = useQuery({
        queryKey: ['myPageBooks'],
        queryFn: getMypageBooks,
    });
    return (
        <View style={styles.myBookScreen}>
            <Text style={[commonStyles.titleText, styles.titleText]}>
                내가 읽은 책
            </Text>
            {isLoading ? (
                <ActivityIndicator size='large' color={commonColors.purple} />
            ) : error ? (
                <Text style={styles.messageText}>
                    {error?.message || '읽은 책 정보를 불러오지 못했습니다.'}
                </Text>
            ) : (
                <ScrollView>
                    {data.length === 0 ? (
                        <Text style={styles.messageText}>
                            아직 읽은 책이 없습니다.
                        </Text>
                    ) : (
                        data.map((item, index) => (
                            <Pressable
                                key={item?.book_id ?? item?.id ?? index}
                                onPress={() => {
                                    navigation.navigate('BookScreen', {
                                        bookId: item?.book_id ?? item?.id,
                                    });
                                }}
                            >
                                <ItemListItem
                                    title={item?.title ?? '제목 없음'}
                                    body={[
                                        {
                                            text: item?.author || '저자 정보 없음',
                                            styles: [commonStyles.smallText],
                                        },
                                        {
                                            text: getTimeAgo(
                                                item?.updated_at ?? item?.lastReadDate
                                            ),
                                            styles: [
                                                commonStyles.smallText,
                                                styles.time,
                                            ],
                                        },
                                    ]}
                                    bookmark={{
                                        isBookmarked:
                                            item?.isBookmarked ??
                                            (item?.bookmark_num ?? 0) > 0,
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
    myBookScreen: { paddingHorizontal: 36 },
    titleText: { marginVertical: 20 },
    time: {
        color: commonColors.lightGrey,
    },
    messageText: {
        color: commonColors.blue,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MyBooksScreen;
