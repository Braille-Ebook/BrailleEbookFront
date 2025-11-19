import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from 'react-native';
import { React, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ConfirmModal } from '../../modals';
import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';

const FindNewIdScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const findId = () => {
        if (!email) {
            setModalVisible(true);
        } else {
            navigation.navigate('FindIdSuccessScreen', { userId: 'test15' });
        }
    };

    return (
        <View style={styles.findIdScreen}>
            <Text style={commonStyles.titleText}>아이디 찾기</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="이메일"
                    style={styles.textInput}
                />
            </View>
            <View style={{ flex: 1 }} />
            <Pressable onPress={findId}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>아이디 찾기</Text>
                </View>
            </Pressable>
            <ConfirmModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title={'이메일 오류'}
                text={'존재하지 않는 이메일입니다.'}
                buttonText={'확인'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    findIdScreen: {
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

export default FindNewIdScreen;