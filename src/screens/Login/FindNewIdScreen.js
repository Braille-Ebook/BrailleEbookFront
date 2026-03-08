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
import { findIdByEmail } from '../../api/authService';
import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import AuthScreenLayout from '../../components/AuthScreenLayout';

const FindNewIdScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const [loading, setLoading] = useState(false);

    const findId = async () => {
        if (!email.trim()) {
            setModalText('이메일을 입력해주세요.');
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const res = await findIdByEmail({ email: email.trim() });
            if (res?.success && res?.userId) {
                navigation.navigate('FindNewIdSuccessScreen', {
                    userId: res.userId,
                });
                return;
            }

            setModalText(res?.message || '아이디를 찾지 못했습니다.');
            setModalVisible(true);
        } catch (err) {
            setModalText(err?.message || '아이디 찾기에 실패했습니다.');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthScreenLayout fallbackRoute='LoginScreen'>
            <View style={styles.findIdScreen}>
                <Text style={commonStyles.titleText}>아이디 찾기</Text>
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
                    <Pressable onPress={findId}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>아이디 찾기</Text>
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
    findIdScreen: {
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

export default FindNewIdScreen;
