import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ReviewListItem } from '../components';
import { getAuthorAndTranslator, getDateString } from '../utils';
import { bookmarkIcon, bookmarkIconFill } from '../../assets/icons';
import { bookDummyData as data } from '../../assets/dummy';
import commonStyles from '../../assets/styles/commonStyles';
import commonColors from '../../assets/colors/commonColors';

const BookScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.bookContainer}>
                <Image
                    source={require('../../assets/images/littleRedRidingHood.png')}
                    style={styles.image}
                />
                <View>
                    <Text style={[commonStyles.titleText, styles.title]}>
                        {data.title}
                    </Text>
                    <Text>{data.imageUrl}</Text>
                    <Text style={styles.contentText}>
                        {getAuthorAndTranslator(data.author, data.translator)}
                    </Text>
                    <Text style={styles.contentText}>{data.publisher}</Text>
                    <Text style={styles.contentText}>
                        {getDateString(data.publishDate)}
                    </Text>
                    <View style={styles.bookmarkContainer}>
                        <Pressable>
                            <Image
                                source={
                                    data.isBookmarked
                                        ? bookmarkIconFill
                                        : bookmarkIcon
                                }
                            />
                        </Pressable>

                        <Text>{`북마크 ${data.bookmarkNum}회`}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    처음부터 읽기
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>이어 읽기</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.bottomScreenContainer}>
                <View>
                    <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                        리뷰
                    </Text>
                    {data.bestReviews.map((review, index) => (
                        <ReviewListItem data={review} key={index} />
                    ))}
                    <Pressable
                        onPress={() => {
                            navigation.navigate('ReviewScreen');
                        }}
                    >
                        <Text
                            style={[commonStyles.smallText, styles.more]}
                        >{`> 리뷰 더 보기`}</Text>
                    </Pressable>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                        줄거리
                    </Text>
                    <Text>{data.summary}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                        목차
                    </Text>
                    {data.toc.map((c, index) => (
                        <Text key={index}>{`${index + 1}장 ${c}`}</Text>
                    ))}
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[commonStyles.subtitleText, styles.subtitle]}>
                        기본정보
                    </Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.column1}>ISBN</Text>
                        <Text style={styles.column2}>{data.isbn}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.column1}>발행(출시)일자</Text>
                        <Text style={styles.column2}>
                            {getDateString(data.publishDate)}
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.column1}>쪽수</Text>
                        <Text style={styles.column2}>{`${data.length}쪽`}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.column1}>
                            원서(번역서)명/저자명
                        </Text>
                        <Text
                            style={styles.column2}
                        >{`${data.titleOrg}/${data.authorOrg}`}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bookContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 45,
    },
    image: {
        width: 200,
        height: 300,
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },
    contentText: {
        textAlign: 'center',
    },
    bookmarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
    },
    button: {
        width: 100,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        marginHorizontal: 2,
    },
    bottomScreenContainer: {
        paddingHorizontal: 42,
    },
    contentContainer: {
        marginVertical: 10,
    },
    subtitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    more: {
        color: commonColors.lightGrey,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    column1: {
        fontWeight: 'bold',
        width: '50%',
    },
    column2: { width: '50%' },
});

export default BookScreen;
