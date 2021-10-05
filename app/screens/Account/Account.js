import React, { useState, useEffect } from "react";

// import * as firebase from '../../utils/firebase'
import Loading from "../../components/Loading"
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

    if(login === null) return <Loading isVisible={true} text="Cargando..."/>;
    
    return (login === null)  ? <UserLogged/> : <UserGuest/>

    // return (
    //     <View>
    //         <Text>Account..</Text>

    //     </View>
    // )

}
