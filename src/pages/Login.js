import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import icon from '../images/icon.png';

export default function Login(){
    return(
        <View style={styles.container}>
            <Image source={icon}></Image>
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário do GitHub" 
                placeholderTextColor="#888888"
                style={styles.input}>
            </TextInput>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});