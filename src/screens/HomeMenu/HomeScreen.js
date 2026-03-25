import React, { useState, useCallback } from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BookList from '../../components/BookList';
import commonColors from '../../../assets/colors/commonColors';
import { getRecentBooks, getRecommendedBooks } from '../../api/homeApi';

const HomeScreen = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useFocusEffect(
        useCallback(() => {
            let cancelled = false;

            async function loadHomeData() {
                setErrorMessage('');
                const [recentResult, recommendResult] = await Promise.allSettled([
                    getRecentBooks(),
                    getRecommendedBooks(),
                ]);

                if (cancelled) return;

                if (recentResult.status === 'fulfilled') {
                    setRecentBooks(recentResult.value || []);
                }
                if (recommendResult.status === 'fulfilled') {
                    setRecommendedBooks(recommendResult.value || []);
                }

                const errors = [recentResult, recommendResult]
                    .filter(r => r.status === 'rejected')
                    .map(r => r.reason?.message);
                if (errors.length > 0) {
                    setErrorMessage(errors.join(' / '));
                }

                setLoading(false);
            }
            loadHomeData();

            return () => { cancelled = true; };
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={commonColors.purple} />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
        >
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            <View style={styles.section}>
                <Text style={styles.title}>최근에 읽은 책</Text>
                <BookList
                    books={recentBooks.map((item) => item?.Book || item)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>추천 도서</Text>
                <BookList
                    books={recommendedBooks.map((item) => item?.Book || item)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        paddingTop: 2,
        paddingBottom: 8,
        alignItems: 'flex-start',
    },
    section: {
        width: '100%',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: commonColors.black,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: commonColors.blue,
        marginBottom: 12,
    },
});

export default HomeScreen;
