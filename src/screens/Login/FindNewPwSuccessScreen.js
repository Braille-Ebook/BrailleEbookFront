import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { React } from 'react';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import { pw } from '../../../assets/icons';

const FindNewPwSuccessScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.findNewPwSuccessScreen}>
            <View>
                <Text style={commonStyles.titleText}>임시 비밀번호</Text>
                <Text style={[styles.subText, commonStyles.subtitleText]}>
                    아래의 이메일로 임시 비밀번호가 전송됐습니다.
                </Text>
                <Text style={[styles.emailText, commonStyles.subtitleText]}>
                    mnevermore1122@gmail.com
                </Text>
            </View>
            <Image source={pw} style={styles.pwImage} />
            <Pressable
                onPress={() => {
                    navigation.navigate();
                }}
            >
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>로그인 다시하기</Text>
                </View>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    findNewPwSuccessScreen: {
        flex: 1,
        paddingHorizontal: 42,
        paddingTop: 60,
        paddingBottom: 40,
    },
    subText: { marginTop: 20 },
    emailText: { color: commonColors.lightPurple },
    pwImage: { width: 160, height: 200, margin: 'auto' },
    buttonContainer: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonColors.black,
    },
    buttonText: {
        color: commonColors.white,
    },
});
export default FindNewPwSuccessScreen;
