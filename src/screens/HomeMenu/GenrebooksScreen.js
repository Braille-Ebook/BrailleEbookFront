import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import GenreButton from '../../components/GenreButton';

import commonStyles from '../../../assets/styles/commonStyles';

const genres = {
  문학: [
    { label: '공상과학', icon: require('../../../assets/images/sciencefictionGenre.png') },
    { label: '미스터리 호러', icon: require('../../../assets/images/mysteryhorrorGenre.png') },
    { label: '로맨스', icon: require('../../../assets/images/romanceGenre.png') },
    { label: '판타지', icon: require('../../../assets/images/fantasyGenre.png') },
    { label: '문학 소설', icon: require('../../../assets/images/literaryfictionGenre.png') },
    { label: '청소년 소설', icon: require('../../../assets/images/youngadultfictionGenre.png') },
  ],
  비문학: [
    { label: '역사', icon: require('../../../assets/images/historyGenre.png') },
    { label: '철학', icon: require('../../../assets/images/philosophyGenre.png') },
    { label: '종교', icon: require('../../../assets/images/religionGenre.png') },
    { label: '과학', icon: require('../../../assets/images/scienceGenre.png') },
    { label: '취미', icon: require('../../../assets/images/hobbiesGenre.png') },
  ],
};

const GenrebooksScreen = () => {
    const navigation = useNavigation();

    const handlePress = genre => {
        navigation.navigate('GenreListScreen', { genre });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Object.entries(genres).map(([category, genreList]) => (
                <View key={category} style={styles.section}>
                    <Text style={[commonStyles.titleText, styles.sectionTitle]}>
                        {category}
                    </Text>
                    <View style={styles.genreGrid}>
                        {genreList.map(genre => (
                            <GenreButton
                                key={genre.label}
                                label={genre.label}
                                icon={genre.icon}
                                onPress={() => handlePress(genre.label)}
                            />
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    genreGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        columnGap: 6,
        rowGap: 8,
    },
});

export default GenrebooksScreen;
