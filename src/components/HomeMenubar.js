import React from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

import commonColors from '../../assets/colors/commonColors';

const HomeMenubar = ({ categories, selectedIndex, onSelect }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
            contentContainerStyle={styles.container}
        >
            {categories.map((cat, idx) => {
                const isActive = selectedIndex === idx;
                return (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => onSelect(idx)}
                        activeOpacity={0.8}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: isActive
                                    ? commonColors.purple
                                    : commonColors.lightPurple,
                            },
                            idx !== categories.length - 1 && styles.chipSpacing,
                        ]}
                        accessibilityRole='button'
                        accessibilityState={{ selected: isActive }}
                    >
                        <Text
                            style={[
                                styles.chipText,
                                {
                                    color: isActive
                                        ? commonColors.white
                                        : commonColors.darkGrey,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
        flexShrink: 0,
        marginBottom: 10,
    },
    container: {
        alignItems: 'center',
        paddingRight: 8,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        minHeight: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipSpacing: {
        marginRight: 8,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default HomeMenubar;
