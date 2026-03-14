import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import commonColors from '../../assets/colors/commonColors';
import ScreenHeader from './ScreenHeader';

export default function AuthScreenLayout({
    children,
    fallbackRoute,
    showBackButton = true,
    centered = false,
    contentContainerStyle,
}) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flexFill}
            >
                {showBackButton && (
                    <ScreenHeader fallbackRoute={fallbackRoute} title='' />
                )}
                <ScrollView
                    style={styles.flexFill}
                    contentContainerStyle={[
                        styles.contentContainer,
                        centered && styles.centeredContent,
                        contentContainerStyle,
                    ]}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={true}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    flexFill: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 42,
        paddingTop: 12,
        paddingBottom: 40,
    },
    centeredContent: {
        justifyContent: 'center',
    },
});
