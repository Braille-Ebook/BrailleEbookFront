import { View, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { send } from '../../assets/icons';

const CommentInputBar = ({ text, onChangeText, placeholder, onSubmit }) => {
    const mutation = useMutation({
        mutationFn: (text) => onSubmit(text),
        onSuccess: () => {
            //queryClient.invalidateQueries(['bookReviews', '/*data.bookId*/']);
            onChangeText('');
        },
        onError: (e) => {},
    });
    return (
        <View style={styles.commentInputBar}>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={text}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    style={styles.textInput}
                    onSubmitEditing={() => {
                        if (!mutation.isLoading) {
                            mutation.mutate(text);
                        }
                    }}
                />
                <Pressable
                    onPress={() => {
                        if (!mutation.isLoading) {
                            mutation.mutate(text);
                        }
                    }}
                >
                    <Image source={send} style={styles.sendIcon} />
                </Pressable>
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
