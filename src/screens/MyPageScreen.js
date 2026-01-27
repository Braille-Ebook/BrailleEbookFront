import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { profile } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';
import { userDummyData as data } from '../../assets/dummy';
import { resetPassword } from '../../api/authService';

const MyPageScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const [showPwModal, setShowPwModal] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [checkPw, setCheckPw] = useState('');

  // ------------------------------
  // 비밀번호 변경 처리
  // ------------------------------
  const handlePasswordChange = async () => {
    if (!currentPw.trim() || !newPw.trim() || !checkPw.trim()) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
    if (newPw.length < 6) {
      Alert.alert('입력 오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (newPw !== checkPw) {
      Alert.alert('입력 오류', '새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await resetPassword({
        currentPassword: currentPw,
        newPassword: newPw,
      });
      if (res?.success) {
        Alert.alert('성공', '비밀번호가 변경되었습니다.', [
          { text: '확인', onPress: () => setShowPwModal(false) },
        ]);
        setCurrentPw('');
        setNewPw('');
        setCheckPw('');
      } else {
        Alert.alert('오류', res?.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error('비밀번호 변경 실패:', err);
      Alert.alert('오류', '서버 통신 중 문제가 발생했습니다.');
    }
  };

  // ------------------------------
  // 로그아웃 처리
  // ------------------------------
  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: async () => await logout() },
    ]);
  };

  return (
    <View style={styles.myPageScreen}>
      <View style={styles.profileContainer}>
        <Image source={profile} style={{ width: 100, height: 100 }} />
      </View>

      {/* 사용자 정보 */}
      <View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>닉네임</Text>
          <Text>{data.nickname}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('MyBooksScreen')}>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>내가 읽은 책</Text>
            <Text>{data.numOfReadBooks}</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('MyReviewsScreen')}>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>내가 쓴 리뷰</Text>
            <Text>{data.numOfReview}</Text>
          </View>
        </Pressable>
      </View>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setShowPwModal(true)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>비밀번호 변경</Text>
          </View>
        </Pressable>

        <Pressable onPress={handleLogout}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </View>
        </Pressable>
      </View>

      {/* ------------------------------
          비밀번호 변경 모달
      ------------------------------ */}
      <Modal
        visible={showPwModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPwModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>비밀번호 변경</Text>

            <TextInput
              value={currentPw}
              onChangeText={setCurrentPw}
              placeholder="현재 비밀번호"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              value={newPw}
              onChangeText={setNewPw}
              placeholder="새 비밀번호"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              value={checkPw}
              onChangeText={setCheckPw}
              placeholder="새 비밀번호 확인"
              secureTextEntry
              style={styles.input}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                onPress={() => setShowPwModal(false)}
                style={[styles.modalButton, { backgroundColor: commonColors.grey }]}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePasswordChange}
                style={[styles.modalButton, { backgroundColor: commonColors.black }]}
              >
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  myPageScreen: {
    paddingHorizontal: 82,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColors.white,
  },
  profileContainer: {
    width: 230,
    height: 230,
    borderWidth: 4,
    borderColor: commonColors.lightGrey,
    borderRadius: 115,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: { flexDirection: 'row', paddingVertical: 3 },
  rowTitle: { width: 100, color: commonColors.purple, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', marginTop: 40 },
  button: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.black,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonText: { color: commonColors.white },

  // Modal
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: commonColors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: commonColors.black,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: commonColors.lightGrey,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: { color: commonColors.white, fontWeight: 'bold' },
});

export default MyPageScreen;