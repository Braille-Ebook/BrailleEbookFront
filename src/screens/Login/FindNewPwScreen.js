import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ConfirmModal } from '../../modals';
import { sendTempPassword } from '../../api/authService';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import AuthScreenLayout from '../../components/AuthScreenLayout';

const FindNewPwScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const [loading, setLoading] = useState(false);

    const getNewPw = async () => {
        if (!email.trim()) {
            setModalText('이메일을 입력해주세요.');
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const res = await sendTempPassword({ email: email.trim() });
            if (res?.success) {
                navigation.navigate('FindNewPwSuccessScreen', {
                    email: email.trim(),
                });
                return;
            }

            setModalText(res?.message || '임시 비밀번호 발급에 실패했습니다.');
            setModalVisible(true);
        } catch (err) {
            setModalText(
                err?.message || '임시 비밀번호 발급 중 오류가 발생했습니다.'
            );
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthScreenLayout fallbackRoute='LoginScreen'>
            <View style={styles.findNewPwScreen}>
                <Text style={commonStyles.titleText}>임시 비밀번호 받기</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='이메일'
                        style={styles.textInput}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.spacer} />
                {loading ? (
                    <ActivityIndicator
                        size='large'
                        color={commonColors.purple}
                    />
                ) : (
                    <Pressable onPress={getNewPw}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>비밀번호 받기</Text>
                        </View>
                    </Pressable>
                )}
                <ConfirmModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    title='알림'
                    text={modalText}
                    buttonText='확인'
                />
            </View>
        </AuthScreenLayout>
    );
};

const styles = StyleSheet.create({
    findNewPwScreen: {
        flex: 1,
    },
    textInputContainer: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 40,
    },
    textInput: {
        width: '100%',
        height: 40,
        paddingHorizontal: 8,
    },
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
    spacer: {
        flex: 1,
    },
});

export default FindNewPwScreen;
