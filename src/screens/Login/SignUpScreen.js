import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { join } from '../../api/authService';
import { validateJoin } from '../../api/authValidators';
import commonColors from '../../../assets/colors/commonColors';
import commonStyles from '../../../assets/styles/commonStyles';
import { ConfirmModal } from '../../modals';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    userId: '',
    email: '',
    nick: '',
    password: '',
    checkPw: '',
  });
  const [pwError, setPwError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleChange = (key) => (text) => {
    setData((prev) => ({ ...prev, [key]: text }));
  };

  const handleSignUp = async () => {
    const errorMsg = validateJoin(data);
    if (errorMsg) {
      setModalText(errorMsg);
      setModalVisible(true);
      return;
    }

    if (data.password !== data.checkPw) {
      setPwError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      const res = await join({
        userId: data.userId,
        email: data.email,
        nick: data.nick,
        password: data.password,
      });

      if (res?.success) {
        setModalText('회원가입이 완료되었습니다.');
        setModalVisible(true);
        setTimeout(() => navigation.navigate('LoginScreen'), 1500);
      } else {
        setModalText(res?.message || '회원가입 실패');
        setModalVisible(true);
      }
    } catch (err) {
      console.error('회원가입 실패:', err);
      setModalText('서버 오류가 발생했습니다.');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.signUpScreen}>
      <Text style={commonStyles.titleText}>가입하기</Text>

      <View style={styles.inputsContainer}>
        <TextInput
          value={data.userId}
          onChangeText={handleChange('userId')}
          placeholder="아이디"
          style={styles.textInput}
        />
        <TextInput
          value={data.email}
          onChangeText={handleChange('email')}
          placeholder="이메일"
          style={styles.textInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          value={data.nick}
          onChangeText={handleChange('nick')}
          placeholder="닉네임"
          style={styles.textInput}
        />
        <TextInput
          value={data.password}
          onChangeText={handleChange('password')}
          placeholder="비밀번호"
          secureTextEntry
          style={styles.textInput}
        />
        <TextInput
          value={data.checkPw}
          onChangeText={handleChange('checkPw')}
          placeholder="비밀번호 확인"
          secureTextEntry
          onBlur={() => {
            if (data.password !== data.checkPw) {
              setPwError('비밀번호가 일치하지 않습니다.');
            } else {
              setPwError('');
            }
          }}
          style={styles.textInput}
        />
        {pwError !== '' && <Text style={styles.errorText}>{pwError}</Text>}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={commonColors.purple} />
      ) : (
        <Pressable onPress={handleSignUp}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>가입하기</Text>
          </View>
        </Pressable>
      )}

      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title="알림"
        text={modalText}
        buttonText="확인"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
    paddingHorizontal: 42,
    paddingTop: 60,
    paddingBottom: 40,
  },
  inputsContainer: { marginTop: 20 },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.black,
    marginTop: 40,
  },
  buttonText: { color: commonColors.white },
  errorText: { color: 'red', marginTop: 5 },
});