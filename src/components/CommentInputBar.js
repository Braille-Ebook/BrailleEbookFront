import { View, StyleSheet, TextInput, Image } from 'react-native';
import React from 'react';

import { send } from '../../assets/icons';

const CommentInputBar = ({ text, onChangeText, placeholder }) => {
    return (
        <View style={styles.commentInputBar}>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    style={styles.textInput}
                />
                <Image source={send} style={styles.sendIcon} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentInputBar: {
        width: '100%',
        height: 60,
        padding: 8,
        backgroundColor: 'white',
    },
    textInputContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 8,
    },
    sendIcon: {
        width: 20,
        height: 20,
    },
});

export default CommentInputBar;
