import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SearchInput, SearchContent } from '../components';

const SearchScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SearchInput />
                <SearchContent />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        padding: 16,
    },
});

export default SearchScreen;
