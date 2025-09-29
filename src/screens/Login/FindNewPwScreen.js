import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Modal,
} from 'react-native';
import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ConfirmModal } from '../../modals';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';

const FindNewPwScreen = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const getNewPw = () => {
        if (!text) {
            setModalVisible(true);
        } else {
            navigation.navigate('FindNewPwSuccessScreen');
        }
    };
    return (
        <View style={styles.findNewPwScreen}>
            <Text style={commonStyles.titleText}>임시 비밀번호 받기</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={text}
                    onChangeText={onChangeText}
                    placeholder='이메일'
                    style={styles.textInput}
                />
            </View>
            <View style={{ flex: 1 }} />
            <Pressable onPress={getNewPw}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>비밀번호 받기</Text>
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
};

const styles = StyleSheet.create({
    findNewPwScreen: {
        flex: 1,
        paddingHorizontal: 42,
        paddingTop: 60,
        paddingBottom: 40,
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
});

export default FindNewPwScreen;
