import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
function ButtonImage({ image, onPress, style}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                style={style}
                source={image}
                resizeMode="contain" 
            />
        </TouchableOpacity>
    )
}
export default ButtonImage;
