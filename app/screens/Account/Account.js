import React, { useState, useEffect } from "react";
import {View, Text} from "react-native";
// import * as firebase from '../../utils/firebase'

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

import firebase from 'firebase'
require('firebase/auth')


export default function Account (){
    const [login, setLogin] = useState(null);
    useEffect(() => {
     
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            !user ? setLogin(false) : setLogin(true);
        });
        
    }, []);


    return (
        <View>
            <Text>Account..</Text>

        </View>
    )

}
