import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
    return (
        <SafeAreaView
            style={{
                width: '100%',
                backgroundColor: 'white',
                position: 'relative',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SearchInput />
                <SearchContent />
            </ScrollView>
        </SafeAreaView>
    )
}

