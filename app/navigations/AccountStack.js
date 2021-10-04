import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "../screens/Search";
import Account from "../screens/Account/Account";


const Stack = createNativeStackNavigator();

export default function AccountStack(){
    return (
    <Stack.Navigator>

<Stack.Screen name="account" component={ Account } options={{ title:"Mi cuenta"}}/>

    </Stack.Navigator>
);
}