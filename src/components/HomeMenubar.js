import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import commonColors from '../../assets/colors/commonColors';
import commonStyles from '../../assets/styles/commonStyles';

const HomeMenubar = ({ categories, selectedIndex, onSelect }) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {categories.map((cat, idx) => (
                <TouchableOpacity
                    key={idx}
                    onPress={() => onSelect(idx)}
                    style={{
                        flex: 1,
                        paddingVertical: 8,
                        borderBottomWidth: 2,
                        borderBottomColor:
                            selectedIndex === idx
                                ? commonColors.purple
                                : 'transparent',
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color:
                                selectedIndex === idx
                                    ? commonColors.purple
                                    : commonColors.lightGrey,
                        }}
                    >
                        {cat}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default HomeMenubar;
