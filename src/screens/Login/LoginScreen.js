import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import { kakaoIcon, bookOpenedBig } from '../../../assets/icons';
import LoginConfirmModal from '../../modals/LoginConfirmModal';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loginResult, setLoginResult] = useState(null);

    // 로그인 확인 (예시, 실제로는 API 호출)
    const handleLogin = async () => {
        // 예시 데이터 (DB 대체)
        const fakeUser = { id: 'test15', pw: '1234' };

        if (id === fakeUser.id && pw === fakeUser.pw) {
            setLoginResult(true);
        } else {
            setLoginResult(false);
        }
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Image source={bookOpenedBig} style={styles.logo} />
            <View style={styles.inputContainer}>
                <TextInput
                    value={id}
                    onChangeText={setId}
                    placeholder='아이디'
                    style={styles.textInput}
                />
                <TextInput
                    value={pw}
                    onChangeText={setPw}
                    placeholder='비밀번호'
                    secureTextEntry
                    style={[styles.textInput, { marginTop: 8 }]}
                />
            </View>

            {/* 로그인하기 버튼 */}
            <Pressable onPress={handleLogin} style={styles.loginButton}>
                <View>
                    <Text style={styles.loginButtonText}>로그인하기</Text>
                </View>
            </Pressable>

            {/* 카카오 로그인 버튼 */}
            <Pressable style={styles.kakaoButton}>
                <Image source={kakaoIcon} style={styles.kakaoIcon} />
                <Text style={styles.kakaoText}>Login with Kakao</Text>
            </Pressable>

            {/* 아이디 / 비밀번호 찾기 */}
            <View style={styles.findContainer}>
                <Pressable onPress={() => navigation.navigate('FindIdScreen')}>
                    <Text style={styles.findText}>아이디 찾기</Text>
                </Pressable>
                <Text style={{ marginHorizontal: 4 }}>/</Text>
                <Pressable
                    onPress={() => navigation.navigate('FindNewPwScreen')}
                >
                    <Text style={styles.findText}>비밀번호 찾기</Text>
                </Pressable>
                <Text style={{ marginHorizontal: 4 }}>/</Text>
                <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={styles.findText}>회원가입</Text>
                </Pressable>
            </View>

            <LoginConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                success={loginResult}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 42,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: { width: 180, height: 180, marginBottom: 30 },
    title: {
        fontSize: 25,
        fontWeight: 800,
        color: commonColors.purple,
        marginBottom: 30,
    },
    inputContainer: { width: '100%' },
    textInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    loginButton: {
        width: '100%',
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: commonColors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: commonColors.white,
        fontWeight: 'bold',
    },
    kakaoButton: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#FEE500',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    kakaoIcon: { width: 20, height: 20, marginRight: 8 },
    kakaoText: { color: '#000', fontWeight: 'bold' },
    findContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    findText: { textDecorationLine: 'underline', color: 'black' },
});

export default LoginScreen;
