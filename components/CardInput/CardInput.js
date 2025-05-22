import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Style from "./Style"
function CardInput({ title, value, onChangeText, placeholder }) {
    return (
        <View style={Style.cardInputContainer}>
              <Text style={Style.title}>{title}</Text>
              <TextInput style={Style.input}
                multiline
                value={value}
                onValueChange={onChangeText}
                placeholder={placeholder}
              />
            </View>
    )
}
export default CardInput;
