import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import commonColors from '../../assets/colors/commonColors';

const LoginConfirmModal = ({ modalVisible, setModalVisible, success }) => {
    const title = success ? '로그인 성공' : '로그인 실패';
    const message = success
        ? '환영합니다! 메인 화면으로 이동합니다.'
        : '아이디 또는 비밀번호가 잘못되었습니다.';

    return (
        <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>확인</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContainer: {
        width: 280,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    message: { fontSize: 14, textAlign: 'center', marginBottom: 25 },
    buttonContainer: {
        backgroundColor: commonColors.black,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: { color: commonColors.white },
});

export default LoginConfirmModal;