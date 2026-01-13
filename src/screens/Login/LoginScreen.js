import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import commonColors from '../../../assets/colors/commonColors';
import { kakaoIcon, bookOpenedBig } from '../../../assets/icons';
import LoginConfirmModal from '../../modals/LoginConfirmModal';
import { login } from '../../api/authService';
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

  const handleLogin = async () => {
    const errorMsg = validateLogin({ identifier, password });
    if (errorMsg) {
      alert(errorMsg);
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

  return (
    <View style={styles.container}>
      <Image source={bookOpenedBig} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="아이디 또는 이메일"
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry
          style={[styles.textInput, { marginTop: 8 }]}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={commonColors.purple} />
      ) : (
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </Pressable>
      )}

      <Pressable style={styles.kakaoButton}>
        <Image source={kakaoIcon} style={styles.kakaoIcon} />
        <Text style={styles.kakaoText}>Login with Kakao</Text>
      </Pressable>

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
    justifyContent: 'center',
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
  kakaoIcon: { width: 20, height: 20, marginRight: 8 },
  kakaoText: { color: '#000', fontWeight: 'bold' },
});

export default LoginScreen;