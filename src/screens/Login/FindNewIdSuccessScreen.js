import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { React } from 'react';

import commonStyles from '../../../assets/styles/commonStyles';
import commonColors from '../../../assets/colors/commonColors';
import { id_screen } from '../../../assets/icons';

const FindNewIdSuccessScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userId } = route.params || { userId: 'test15' };

    return (
        <View style={styles.findIdSuccessScreen}>
            <View>
                <Text style={commonStyles.titleText}>아이디 찾기 성공</Text>
                <Text style={[styles.subText, commonStyles.subtitleText]}>
                    귀하의 아이디는 다음과 같습니다.
                </Text>
                <Text style={[styles.idText, commonStyles.subtitleText]}>
                    {userId}
                </Text>
            </View>
            <Image source={id_screen} style={styles.idImage} />
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>로그인 다시하기</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    findIdSuccessScreen: {
        flex: 1,
        paddingHorizontal: 42,
        paddingTop: 60,
        paddingBottom: 40,
    },
    subText: { marginTop: 20 },
    idText: { color: commonColors.lightPurple, marginTop: 8 },
    idImage: { width: 160, height: 160, alignSelf: 'center', marginVertical: 40 },
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

export default FindNewIdSuccessScreen;