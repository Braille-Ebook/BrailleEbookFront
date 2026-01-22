import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { ItemListItem } from '../components';
import { getTimeAgo } from '../utils';
import { myReadBooksDummyData } from '../../assets/dummy';
import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

import { getMypageBooks } from '../api';

const MyBooksScreen = () => {
    const navigation = useNavigation();
    const { realData, isLoading, error } = useQuery({
        queryKey: ['mypageBooks'],
        queryFn: getMypageBooks,
    });
    return (
        <View style={styles.myBookScreen}>
            <Text style={[commonStyles.titleText, styles.titleText]}>
                내가 읽은 책
            </Text>
            <ScrollView>
                {myReadBooksDummyData.map((data, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            navigation.navigate('BookScreen');
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
                                    text: getTimeAgo(data.lastReadDate),
                                    styles: [
                                        commonStyles.smallText,
                                        styles.time,
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
    myBookScreen: { paddingHorizontal: 36 },
    titleText: { marginVertical: 20 },
    time: {
        color: commonColors.lightGrey,
    },
});

export default MyBooksScreen;
