import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import api from '../services/api';
import icon from '../images/icon.png';

export default function Login({ navigation }){
    const [user, setUser] = useState('');

    //useEffect dispara funcionalidades assim que o componente é exibido em tela
    useEffect(() => { //vai disparar apenas uma vez ('[]'), depois que uma variável x for executada
        AsyncStorage.getItem('user').then(user=>{ //vai pegar o item user, then --> se tiver algum resultado 
            if(user){ //se tiver alguma info dentro do usuário, manda ele direto pra tela Main
                navigation.navigate('Main', {user})
            }
        })
    }, []);

    async function handleLogin() {

        const response = await api.post('/devs', {username: user});
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id); //chamada para o storage local dentro do app

        navigation.navigate('Main', { user: _id });
    }

    return(
        <View style={styles.container}>
            <Image source={icon}></Image>
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário do GitHub" 
                placeholderTextColor="#888888"
                style={styles.input}
                value={user}
                onChangeText={setUser}
                >
            </TextInput>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
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