import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ArrowButton({onPress, style}) {
    return(
        <TouchableOpacity onPress={onPress} style={style}>
            <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
    )
}


