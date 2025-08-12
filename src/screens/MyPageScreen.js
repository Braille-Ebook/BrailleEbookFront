import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import commonColors from '../../assets/colors/commonColors';
import { userDummyData as data } from '../../assets/dummy';

const MyPageScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.myPageScreen}>
            <View style={styles.profileContainer}>
                <Image source={require('../../assets/icons/profile.png')} />
            </View>
            <View>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>닉네임</Text>
                    <Text>{data.nickname}</Text>
                </View>
                <Pressable
                    onPress={() => {
                        navigation.navigate('MyBooksScreen');
                    }}
                >
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>내가 읽은 책</Text>
                        <Text>{data.numOfReadBooks}</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => {
                        navigation.navigate('MyReviewsScreen');
                    }}
                >
                    <View style={styles.row}>
                        <Text style={styles.rowTitle}>내가 쓴 리뷰</Text>
                        <Text>{data.numOfReview}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>비밀번호 변경</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>로그아웃</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    myPageScreen: {
        paddingHorizontal: 82,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        width: 230,
        height: 230,
        borderWidth: 4,
        borderColor: commonColors.lightGrey,
        borderStyle: 'solid',
        borderRadius: '50%',
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 3,
    },
    rowTitle: {
        width: 100,
        color: commonColors.lightPurple,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    button: {
        width: 120,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonColors.black,
        borderRadius: 5,
        marginHorizontal: 2,
    },
    buttonText: {
        color: commonColors.white,
    },
});

export default MyPageScreen;
