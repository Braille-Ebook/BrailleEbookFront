import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    View,
    useWindowDimensions,
} from 'react-native';
import commonColors from '../../assets/colors/commonColors';

const GenreButton = ({ label, icon, onPress }) => {
    const { width } = useWindowDimensions();
    const isCompactScreen = width < 390;

    return (
        <TouchableOpacity style={styles.genreButton} onPress={onPress}>
            <ImageBackground
                source={icon}
                style={styles.imageBackground}
                imageStyle={styles.image}
                resizeMode='cover'
            >
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.text,
                            isCompactScreen && styles.compactText,
                        ]}
                    >
                        {label}
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    genreButton: {
        width: '48%',
        aspectRatio: 1.45,
        minHeight: 108,
        borderRadius: 13,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 13,
    },
    textContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: commonColors.white,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '300',
    },
    compactText: {
        fontSize: 18,
    },
});

export default GenreButton;
