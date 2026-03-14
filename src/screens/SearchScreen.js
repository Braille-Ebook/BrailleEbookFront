import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonColors from '../../assets/colors/commonColors';
import { backIcon, cancelIcon } from '../../assets/icons';
import BookList from '../components/BookList';
import { searchBooks } from '../api/searchApi';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setErrorMessage('');
        try {
            const res = await searchBooks(query);
            setBooks(res?.items || []);
        } catch (err) {
            setBooks([]);
            setErrorMessage(err?.message || '검색에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBar}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Image source={backIcon} style={styles.backIcon} />
                </TouchableOpacity>

                <View style={styles.inputWrapper}>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder='책을 검색하세요'
                        placeholderTextColor={commonColors.lightGrey}
                        style={styles.input}
                        onSubmitEditing={handleSearch}
                        autoFocus
                        returnKeyType='search'
                    />

                    {query.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setQuery('')}
                            style={styles.cancelButton}
                        >
                            <Image source={cancelIcon} style={styles.cancelIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size='large'
                        color={commonColors.purple}
                    />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.listContainer}>
                    {errorMessage !== '' && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}
                    <BookList books={books} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 12,
        gap: 4,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 40,
        height: 40,
        tintColor: commonColors.darkGrey,
    },
    inputWrapper: {
        flex: 1,
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 28,
        backgroundColor: commonColors.lightPurple,
        paddingLeft: 16,
        paddingRight: 8,
    },
    input: {
        flex: 1,
        minWidth: 0,
        fontSize: 16,
        color: commonColors.black,
    },
    cancelButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelIcon: {
        width: 22,
        height: 22,
        tintColor: commonColors.darkGrey,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    errorText: {
        color: commonColors.blue,
        marginBottom: 12,
    },
});
