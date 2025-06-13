import React from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';

function IconTextButton({ icon,text, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.conteiner}>
                <Image
                    style={styles.image}
                    source={icon}
                />
                <Text style={styles.title}>{text}</Text>    
            </View>
            
        </TouchableOpacity>
    )
}
export default IconTextButton;
 
const styles = StyleSheet.create({
    conteiner:{
        marginVertical: 15,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    button:{
        widht: 12
    },
    image:{
        width: 35,
        height: 35,
    },
    title:{
        fontSize: 20,
        
    },

});
