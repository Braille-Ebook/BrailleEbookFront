import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';

export default function PdfBar({ setOpen, bookmark, setBookmark }) {
    return (
        <View style={styles.barContainer}>
            <Pressable
                onPress={() => {
                    setOpen((prev) => !prev);
                }}
            >
                <Image
                    source={require('../../assets/icons/menu.png')}
                    style={styles.menuIcon}
                />
            </Pressable>
            <Pressable
                onPress={() => {
                    setBookmark((prev) => !prev);
                }}
            >
                <Image
                    source={
                        bookmark
                            ? require('../../assets/icons/bookmarkIconFill.png')
                            : require('../../assets/icons/bookmarkIcon.png')
                    }
                    style={styles.bookmarkIcon}
                />
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    barContainer: {
        width: '100%',
        height: 55,
        paddingHorizontal: 15,
        backgroundColor: 'rgb(64,64,64)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuIcon: { width: 25, height: 25 },
    bookmarkIcon: { width: 40, height: 40 },
});
