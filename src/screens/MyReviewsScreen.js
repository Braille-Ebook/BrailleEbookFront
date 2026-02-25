import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { ItemListItem } from '../components';
import { myReviewsDummyData } from '../../assets/dummy';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import { getMypageReviews } from '../api';

const MyReviewsScreen = () => {
    const navigation = useNavigation();
    const { realData, isLoading, error } = useQuery({
        queryKey: ['mypageReviews'],
        queryFn: getMypageReviews,
    });
    return (
        <View style={styles.myReviewsScreen}>
            <Text style={[commonStyles.titleText, styles.titleText]}>
                내가 쓴 리뷰
            </Text>
            <ScrollView>
                {myReviewsDummyData.map((data, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            navigation.navigate('ReviewScreen');
                        }}
                    >
                        <ItemListItem
                            title={data.title}
                            body={[
                                {
                                    text: data.author,
                                    styles: [commonStyles.smallText],
                                },
                                {
                                    text: data.content,
                                    styles: [
                                        commonStyles.smallText,
                                        styles.content,
                                    ],
                                },
                            ]}
                            bookmark={{ isBookmarked: data.isBookmarked }}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    myReviewsScreen: { paddingHorizontal: 36 },
    titleText: { marginVertical: 20 },
    content: {
        color: commonColors.lightPurple,
    },
});

export default MyReviewsScreen;
