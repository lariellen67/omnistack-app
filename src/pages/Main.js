import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import api from '../services/api';
import icon from '../images/icon.png';
import like from '../images/like.png';
import deslike from '../images/deslike.png';
import matchwhite from '../images/matchwhite.png';

export default function Main({ navigation }){
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    console.log(id);

    useEffect(() => {
        async function loadUsers(){ 
            const response = await api.get('/devs', { 
                headers: { 
                    user: id,
                }
            })
            setUsers(response.data); 
        }
        loadUsers(); 
    }, [id]);


    useEffect(() =>{ 
        const socket = io('http://192.168.0.31:3333', {
            query: {user: id} 
        });

        socket.on('match', dev =>{
           setMatchDev(dev); 
        })
    }, [id]); 



    async function handleDeslike(){
        const [user, ...rest] = users;

        await api.post(`/devs/${user._id}/deslikes`, null, {
            headers: {user: id},
        })
        setUsers(rest);
        /*setUsers(users.filter(user => user._id !== id));*/ //não é mais necessário, é substituído pelo de cima
    }

    async function handleLike(){
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {user: id},
        })
        setUsers(rest);
    }

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
            <TouchableOpacity style={styles.buttonlo} onPress={handleLogout}>
                    <Text style={styles.buttonloText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.icon} source={icon}></Image>

            <View style={styles.cardsContainer}>
               {users.length > 0 ? 
                    users.map((user, index) => (
                        <View key={user._id} style={[styles.card, {zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar}}></Image>
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={4}>{user.bio}</Text>
                            </View>
                        </View>
                    ))           
                : (
                    <Text style={styles.empty}>Acabou, you're lonely :( </Text>
                )}
            </View>

            {users.length > 0 && (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDeslike}>
                    <Image source={deslike}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={like}></Image>
                </TouchableOpacity>
            </View>
            )}

            {matchDev && (
                <View style={styles.matchContainer}>
                    <Image source={matchwhite} style={styles.matchWhite}></Image>
                    <Image style={styles.matchAvatar} source={{uri: matchDev.avatar}}></Image>
                    <Text style={styles.matchName}>{matchDev.name}</Text>
                    <Text style={styles.matchBio}>{matchDev.bio}</Text>
                    <TouchableOpacity onPress={() => setMatchDev(null)}>
                        <Text style={styles.closeMatch}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    icon:{
        marginTop: -60,
    },

    empty:{
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },  

    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },

    card:{
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        marginBottom: -10, //e
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },

    avatar:{
        flex: 1,
        height: 300,
    },

    footer:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio:{
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },

    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 30,
    },

    button:{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
    },

    buttonlo:{
        width: 70,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#df4723',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
        marginRight: -300,
        marginLeft: 115,
        marginTop: 10,
        elevation: 2,
    },

    buttonloText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

    matchContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    matchWhite:{
        height: 80,
        width: 310,
    },

    matchAvatar:{
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30
    },

    matchName:{
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff'
    },

    matchBio:{
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30,
    },

    closeMatch:{
        width: 90,
        height: 35,
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        borderWidth: 3,
        borderColor: '#df4722',
        borderRadius: 2,
        textAlign: 'center',
        marginTop: 25,
        paddingTop: 5,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    }

});