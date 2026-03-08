import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { React } from 'react';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import { pw } from '../../../assets/icons';
import AuthScreenLayout from '../../components/AuthScreenLayout';

const FindNewPwSuccessScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params?.email ?? 'mnevermore1122@gmail.com';
    return (
        <AuthScreenLayout fallbackRoute='FindNewPwScreen'>
            <View style={styles.findNewPwSuccessScreen}>
                <View>
                    <Text style={commonStyles.titleText}>임시 비밀번호</Text>
                    <Text style={[styles.subText, commonStyles.subtitleText]}>
                        아래의 이메일로 임시 비밀번호가 전송됐습니다.
                    </Text>
                    <Text style={[styles.emailText, commonStyles.subtitleText]}>
                        {email}
                    </Text>
                </View>
                <Image source={pw} style={styles.pwImage} />
                <Pressable
                    onPress={() => {
                        navigation.navigate('LoginScreen');
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>로그인 다시하기</Text>
                    </View>
                </Pressable>
            </View>
        </AuthScreenLayout>
    );
};
const styles = StyleSheet.create({
    findNewPwSuccessScreen: {
        flex: 1,
    },
    subText: { marginTop: 20 },
    emailText: {
        color: commonColors.blue,
        marginTop: 8,
        fontWeight: '600',
    },
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
