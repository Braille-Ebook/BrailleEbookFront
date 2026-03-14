import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import BookList from '../../components/BookList';
import commonColors from '../../../assets/colors/commonColors';
import { getRecentBooks, getRecommendedBooks } from '../../api/homeApi';

const HomeScreen = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function loadHomeData() {
            try {
                const [recentRes, recommendRes] = await Promise.all([
                    getRecentBooks(),
                    getRecommendedBooks(),
                ]);
                setRecentBooks(recentRes || []);
                setRecommendedBooks(recommendRes || []);
            } catch (err) {
                setErrorMessage(
                    err?.message || '홈 데이터를 불러오지 못했습니다.'
                );
            } finally {
                setLoading(false);
            }
        }
        loadHomeData();
    }, []);

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
