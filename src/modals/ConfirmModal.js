import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import commonColors from '../../assets/colors/commonColors';

const ConfirmModal = ({
    modalVisible,
    setModalVisible,
    title,
    text,
    buttonText,
}) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.contentText}>{text}</Text>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', // dim background
    },
    modalView: {
        width: '80%',
        backgroundColor: commonColors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleText: {
        fontWeight: 700,
        marginBottom: 10,
    },
    contentText: { marginBottom: 10 },
    button: {
        height: 50,
        backgroundColor: commonColors.blue,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: commonColors.white,
        fontWeight: 700,
    },
});

export default ConfirmModal;
