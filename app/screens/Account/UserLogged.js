import React from "react";
import {View, Text , Button} from "react-native";
import firebase from "firebase/app";


export default function UserLogged(){
    return (
        <View>
            <Text>UserLogged...</Text>
            <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()}/>

        </View>
    )

}
