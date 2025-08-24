import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { React, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { send } from '../../assets/icons';
import commonStyles from '../../assets/styles/commonStyles';

const ReviewEditScreen = () => {
    const route = useRoute();
    const { orgText } = route.params;
    const [text, setText] = useState(orgText);
    return (
        <View style={styles.reviewEditScreen}>
            <View style={styles.topContainer}>
                <Text style={[commonStyles.subtitleText, styles.title]}>
                    리뷰 편집
                </Text>
                <Image source={send} style={styles.icon} />
            </View>
            <TextInput
                multiline={true}
                value={text}
                onChangeText={setText}
                style={styles.textInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewEditScreen: {
        padding: 42,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
    },
    icon: {
        width: 20,
        height: 20,
    },
    textInput: {
        width: '100%',
        textAlignVertical: 'top',
    },
});

export default ReviewEditScreen;
