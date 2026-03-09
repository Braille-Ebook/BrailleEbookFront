import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HomeMenubar from '../../components/HomeMenubar';
import HomeScreen from './HomeScreen';
import BestsellerScreen from './BestsellerScreen';
import NewbooksScreen from './NewbooksScreen';
import GenrebooksScreen from './GenrebooksScreen';

import commonColors from '../../../assets/colors/commonColors';
import { SearchIcon } from '../../../assets/icons';

const BookSearchScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation = useNavigation();
    const categories = ['홈', '인기 도서', '신간 도서', '장르별 도서'];

    const renderContent = () => {
        switch (selectedIndex) {
            case 0:
                return <HomeScreen />;
            case 1:
                return <BestsellerScreen />;
            case 2:
                return <NewbooksScreen />;
            case 3:
                return <GenrebooksScreen />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>
                <TouchableOpacity
                    style={styles.searchBar}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('SearchScreen')}
                    accessibilityRole='button'
                    accessibilityLabel='검색창 열기'
                >
                    <TextInput
                        placeholder='책을 검색해 보아요!'
                        editable={false}
                        style={styles.searchInput}
                        pointerEvents='none'
                    />
                    <Image source={SearchIcon} style={styles.searchIcon} />
                </TouchableOpacity>

                <HomeMenubar
                    categories={categories}
                    selectedIndex={selectedIndex}
                    onSelect={idx => setSelectedIndex(idx)}
                />

                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.white,
    },
    inner: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: commonColors.lightPurple,
        minHeight: 56,
        paddingLeft: 16,
        paddingRight: 10,
        borderRadius: 28,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        minWidth: 0,
        color: commonColors.darkGrey,
        fontSize: 16,
    },
    searchIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});

export default BookSearchScreen;
