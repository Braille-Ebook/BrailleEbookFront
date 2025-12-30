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

import { signUp } from '../../apis';
import { ConfirmModal } from '../../modals';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState({ email: '', pw: '', checkPw: '' });
    const [pwError, setPwError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const handleChange = (key) => (text) => {
        setData((prev) => ({
            ...prev,
            [key]: text,
        }));
    };
    const checkCheckPw = () => {};
    return (
        <View style={styles.signUpScreen}>
            <View style={styles.titleText}>
                <Text style={commonStyles.titleText}>가입하기</Text>
            </View>
            <View style={styles.inputsContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={data.email}
                        onChangeText={handleChange('email')}
                        placeholder='이메일'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={data.pw}
                        onChangeText={handleChange('pw')}
                        placeholder='비밀번호'
                        secureTextEntry
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        value={data.checkPw}
                        onChangeText={handleChange('checkPw')}
                        placeholder='비밀번호 확인'
                        secureTextEntry
                        onBlur={() => {
                            if (data.pw !== data.checkPw) {
                                setPwError('비밀번호가 일치하지 않습니다.');
                            } else {
                                setPwError('');
                            }
                        }}
                        style={styles.textInput}
                    />
                </View>
                {pwError !== '' && (
                    <Text style={styles.errorText}>{pwError}</Text>
                )}
            </View>
            <View style={{ flex: 1 }} />
            <Pressable
                onPress={async () => {
                    const result = await signUp(data);
                    console.log(result);
                }}
            >
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>가입하기</Text>
                </View>
            </Pressable>
            <ConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={'아이디 오류'}
                text={'존재하지 않는 아이디입니다.'}
                buttonText={'확인'}
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
    titleText: {
        marginBottom: 40,
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
        marginTop: 20,
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
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
