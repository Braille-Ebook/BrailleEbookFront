import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { whiteBackIcon } from '../../assets/icons';

export default function PdfBar({
    setOpen,
    bookmark,
    setBookmark,
    onPressBack,
}) {
    return (
        <View style={styles.barContainer}>
            <View style={styles.leftGroup}>
                <Pressable onPress={onPressBack} style={styles.backButton}>
                    <Image source={whiteBackIcon} style={styles.backIcon} />
                </Pressable>
                {/*<Pressable
                        onPress={() => {
                            setOpen((prev) => !prev);
                        }}
                    >
                        <Image
                            source={require('../../assets/icons/menu.png')}
                            style={styles.menuIcon}
                        />
                    </Pressable>*/}
            </View>
            {/*<Pressable
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
            </Pressable> */}
        </View>
    );
}
const styles = StyleSheet.create({
    barContainer: {
        width: '100%',
        height: 72,
        paddingHorizontal: 15,
        backgroundColor: 'rgb(64,64,64)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    backIcon: {
        width: 48,
        height: 48,
    },
    menuIcon: { width: 25, height: 25 },
    bookmarkIcon: { width: 40, height: 40 },
});
