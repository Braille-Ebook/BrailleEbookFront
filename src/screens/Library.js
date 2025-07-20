import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import Book from '../components/Book';
import { libraryDummyData } from '../../assets/dummy';
import commonStyles from '../../assets/styles/commonStyles';

const Library = () => {
    return (
        <View style={styles.libraryContainer}>
            <View style={styles.titleContainer}>
                <Image
                    source={require('../../assets/icons/bookOpened.png')}
                    style={styles.bookOpened}
                />
                <Text style={commonStyles.titleText}>내 라이브러리</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {libraryDummyData.map((data, index) => (
                    <Book data={data} key={index} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    libraryContainer: {
        height: '100%',
    },
    bookOpened: {
        marginRight: 16,
    },
    scrollView: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 35,
    },
});

export default Library;
