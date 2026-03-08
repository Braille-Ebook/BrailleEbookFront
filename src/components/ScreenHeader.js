import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { backIcon } from '../../assets/icons';
import commonColors from '../../assets/colors/commonColors';

export default function ScreenHeader({
    title,
    fallbackRoute,
    onBackPress,
    right,
    showBackButton = true,
}) {
    const navigation = useNavigation();

    const handleBack = () => {
        if (typeof onBackPress === 'function') {
            onBackPress();
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack();
            return;
        }

        if (!fallbackRoute) {
            return;
        }

        if (typeof fallbackRoute === 'string') {
            navigation.navigate(fallbackRoute);
            return;
        }

        navigation.navigate(fallbackRoute.name, fallbackRoute.params);
    };

    return (
        <View style={styles.header}>
            <View style={styles.side}>
                {showBackButton && (
                    <Pressable
                        onPress={handleBack}
                        hitSlop={8}
                        style={styles.backButton}
                    >
                        <Image source={backIcon} style={styles.backIcon} />
                    </Pressable>
                )}
            </View>

            <Text numberOfLines={1} style={styles.title}>
                {title}
            </Text>

            <View style={[styles.side, styles.right]}>{right}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: commonColors.white,
    },
    side: {
        width: 40,
        justifyContent: 'center',
    },
    right: {
        alignItems: 'flex-end',
    },
    backButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: commonColors.black,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: commonColors.black,
        textAlign: 'center',
    },
});
