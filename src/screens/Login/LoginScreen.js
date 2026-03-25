import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    Alert,
    StyleSheet,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import { logo } from '../../../assets/icons';
import AuthScreenLayout from '../../components/AuthScreenLayout';
import LoginConfirmModal from '../../modals/LoginConfirmModal';
import {
    buildKakaoLoginUrl,
    completeKakaoLoginFromCode,
    completeSocialLogin,
    login,
    parseKakaoCallback,
} from '../../api/authService';
import { validateLogin } from '../../api/authValidators';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login: setAuthLogin } = useAuth();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loginResult, setLoginResult] = useState(null);

    React.useEffect(() => {
        const handleKakaoCallback = async incomingUrl => {
            const result = parseKakaoCallback(incomingUrl);
            if (!result) return;

            if (result.error) {
                Alert.alert('카카오 로그인 실패', result.error);
                return;
            }

            try {
                if (result.token) {
                    await completeSocialLogin(result.token);
                    setAuthLogin();
                    return;
                }

                if (result.code) {
                    const data = await completeKakaoLoginFromCode({
                        code: result.code,
                        state: result.state,
                    });

                    if (data?.success || data?.accessToken || data?.token) {
                        setAuthLogin();
                        return;
                    }

                    Alert.alert(
                        '카카오 로그인 실패',
                        '카카오 로그인 응답에서 로그인 완료 정보를 확인하지 못했습니다.',
                    );
                    return;
                }
            } catch (err) {
                console.error('카카오 로그인 후처리 실패:', err);
                Alert.alert(
                    '카카오 로그인 실패',
                    '카카오 로그인 후처리 중 오류가 발생했습니다.',
                );
                return;
            }

            if (!result.token && !result.code) {
                Alert.alert(
                    '카카오 로그인 실패',
                    '로그인 콜백 파라미터를 확인할 수 없습니다. 서버 콜백 설정을 확인해주세요.',
                );
            }
        };

        Linking.getInitialURL()
            .then(url => {
                if (url) {
                    handleKakaoCallback(url);
                }
            })
            .catch(err => {
                console.error('초기 카카오 딥링크 확인 실패:', err);
            });

        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleKakaoCallback(url);
        });

        return () => {
            subscription.remove();
        };
    }, [setAuthLogin]);

    const handleLogin = async () => {
        const errorMsg = validateLogin({ identifier, password });
        if (errorMsg) {
            Alert.alert('입력 오류', errorMsg);
            return;
        }

        setLoading(true);
        try {
            const res = await login({ identifier, password });
            if (res?.success) {
                setLoginResult(true);
                setAuthLogin(); // 전역 상태 true로 전환
            } else {
                setLoginResult(false);
            }
        } catch (err) {
            console.error('로그인 실패:', err);
            setLoginResult(false);
        } finally {
            setLoading(false);
            setModalVisible(true);
        }
    };

    const handleKakaoLogin = async () => {
        const kakaoLoginUrl = buildKakaoLoginUrl();

        try {
            await Linking.openURL(kakaoLoginUrl);
        } catch (err) {
            console.error('카카오 로그인 URL 열기 실패:', err);
            Alert.alert(
                '카카오 로그인 실패',
                '카카오 로그인 화면을 열 수 없습니다.',
            );
        }
    };

    return (
        <AuthScreenLayout
            centered={true}
            contentContainerStyle={styles.scrollContent}
            showBackButton={false}
        >
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Image source={logo} style={styles.logo} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={identifier}
                        onChangeText={setIdentifier}
                        placeholder='아이디 또는 이메일'
                        style={styles.textInput}
                        autoCapitalize='none'
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='비밀번호'
                        secureTextEntry
                        style={[styles.textInput, styles.passwordInput]}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator
                        size='large'
                        color={commonColors.purple}
                    />
                ) : (
                    <Pressable onPress={handleLogin} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>로그인하기</Text>
                    </Pressable>
                )}

                <Pressable onPress={handleKakaoLogin} style={styles.kakaoButton}>
                    <Text style={styles.kakaoText}>Login with Kakao</Text>
                </Pressable>

                <LoginConfirmModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    success={loginResult}
                />
                <View style={styles.accountManagementContainer}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('SignUpScreen');
                        }}
                    >
                        <Text style={styles.accountManagement}>회원가입</Text>
                    </Pressable>
                    <Text style={styles.accountManagementDivider}>/</Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('FindNewIdScreen');
                        }}
                    >
                        <Text style={styles.accountManagement}>아이디 찾기</Text>
                    </Pressable>
                    <Text style={styles.accountManagementDivider}>/</Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('FindNewPwScreen');
                        }}
                    >
                        <Text style={styles.accountManagement}>비밀번호 찾기</Text>
                    </Pressable>
                </View>
            </View>
        </AuthScreenLayout>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    logoWrapper: {
        alignItems: 'center',
    },
    logo: { width: 180, height: 180, marginBottom: 30 },
    inputContainer: { width: '100%' },
    textInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    passwordInput: {
        marginTop: 8,
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
    loginButtonText: { color: commonColors.white, fontWeight: 'bold' },
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
    kakaoText: { color: '#000', fontWeight: 'bold' },
    accountManagementContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 24,
    },
    accountManagementDivider: { color: '#4A90E2', marginHorizontal: 10 },
    accountManagement: { color: '#4A90E2', textDecoration: 'underline' },
});

export default LoginScreen;
